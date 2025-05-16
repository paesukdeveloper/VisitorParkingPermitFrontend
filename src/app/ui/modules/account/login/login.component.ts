import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { EncryptionService } from '../../../../helpers/security/encryption.service';
import { TokenModel } from '../../../../view-models/token-model';
import { noWhitespaceValidator } from '../../../../../validators/nospacevalidator';
import { AuthService } from '../../../../shared/auth/auth.service';
import { HttpStatusCodes } from '../../../../shared/enums/http-status-codes.enum';
import { TransferLoginDataService } from '../../../services/transfer-login-data/transfer-login-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  encId: string = "";
  public jwtHelper: JwtHelperService = new JwtHelperService();
  isRemember = localStorage.getItem('username')?.toString() ? true : false
  passwordVisible: boolean = false; // for password show/hide
  passwordFieldType: string = 'password';// for password show/hide
  isNewPasswordShow = false;
  isCnfPasswordShow = false;
  loginForm!: FormGroup;
  submitted = false;
  isValidate = false;
  error = '';
  apiResponseMessage = '';
 
 

  //visitor parking 
    locationId: string ="";
    locationAddress: string ="";
    parkingDuration: string[] = [];

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }

  constructor(private route: Router,
    private spinnerService: NgxSpinnerService,
    private authenticationService: AuthService,
    private formBuilder: FormBuilder,
    private encryption: EncryptionService,
    private loginDataService: TransferLoginDataService
  ){
    this.isRemember = localStorage.getItem('rememberMe') === 'true';
    const localStorageTokens = localStorage.getItem('tokens');
    let token: TokenModel;
    if (localStorageTokens) {
      token = JSON.parse(localStorageTokens) as TokenModel;
      token.deviceType = 'web';
      const isTokenExpired = this.jwtHelper.isTokenExpired(token?.token);
      if (isTokenExpired)
        this.route.navigate(['/login'])
      else
        this.route.navigate(['/dashboard'])
    }
   

  }

  ngOnInit(): void{
   
    this.isRemember = localStorage.getItem('rememberMe') === 'true';
    let localStorageUsername = localStorage.getItem('username');   
    const localStoragePassword = localStorage.getItem('password');

    localStorageUsername = localStorageUsername !== 'undefined' && localStorageUsername !== null ? localStorageUsername : "";
    this.loginForm = this.formBuilder.group({
      userName: [this.isRemember ? localStorageUsername : "", [Validators.required]],
      password: [this.isRemember ? localStoragePassword : "", [Validators.required]],
      rememberMe: [this.isRemember] // Add rememberMe control
    });
    
   

  }


loginClick() {
  this.loginForm.markAllAsTouched()
  // Mark the form as submitted
  this.submitted = true;
   // Check if the password is provided
  const passwordProvided = !!this.loginForm.get('password')?.value;

  // Stop here if form is invalid or password is not provided
  if (this.loginForm.invalid || !passwordProvided) {
  return;
  }
  this.spinnerService.show(undefined, {
    type: 'timer', 
    fullScreen: true
  });
  if (this.isRemember) {
    localStorage.setItem('username', this.loginForm.value.userName)
    localStorage.setItem('rememberMe', 'true')
    
  }
  
  const loginData = this.loginForm.value;
  const requestData = {
    userName: loginData.userName,
    password: encodeURIComponent(this.encryption.OpenSSLEncrypt(loginData.password)),
    deviceType: 'web',
    deviceToken: 'token'
  }
  this.authenticationService.login(requestData)  
  .pipe(first())
  .subscribe({
    next: (response:any) => {
       if(response.status ===HttpStatusCodes.SuccessOK){
        this.encId = response.data.user.encId
        localStorage.setItem('encId', this.encId)
        }
        if (response.status === HttpStatusCodes.SuccessOK && (response.data.user.is2FAEnabled === 1 || response.data.user.is2FAEnabledEmail === 1 || response.data.user.is2FAEnabledSMS === 1)) {
          this.authenticationService.setUsername(response.data.user.emailAddress);
          this.route.navigate(['/twoFactorAuth']);
        }
        else if(response.status ===  HttpStatusCodes.SuccessOK && response.data.user.is2FAEnabled === 0){
          this.authenticationService.setUsername(response.data.user.emailAddress);
          this.route.navigate(['/dashboard']);
          this.locationId  =  response.data.user.locationId;
          this.locationAddress = response.data.user.address;
          this.parkingDuration = response.data.user.parkingDuration;
          this.TransferLoginData()
        }
        else {
          switch(response.status) {
            case HttpStatusCodes.NotAllowed:
              this.checkPassExpiry(loginData.userName)
              this.apiResponseMessage = response.message;
              break;
            case HttpStatusCodes.ClientErrorBadRequest:
              this.apiResponseMessage = response.message;
              break;
            case HttpStatusCodes.ClientErrorUnauthorized:
              this.apiResponseMessage = response.message;
              break;
              case HttpStatusCodes.ClientDoesNotHaveAccess:
                this.apiResponseMessage = response.message;
                break;
            default:
              this.apiResponseMessage = "An error occurred: " + response.message;
              break;
          }
          this.isValidate = true;
        }
      
      this.error = this.apiResponseMessage; // Set error message here
      if(this.apiResponseMessage =="Your password is expired" && loginData.userName!=""){ 
        this.checkPassExpiry(loginData.userName)
      }
      },
      error: response => {
        this.error = response.message|| 'Incorrect Credential';
        this.spinnerService.hide();
      },
      complete: () => {
        this.spinnerService.hide();
      },
    });

}




checkPassExpiry(UserEmail: string){
  this.spinnerService.show(undefined, {
    type: 'timer',
      fullScreen: true
  });
    this.authenticationService.forgotPassword(UserEmail)
    .pipe(first())
      .subscribe({
        next: (response) => {
          if (response.status === HttpStatusCodes.SuccessOK ) {
            this.authenticationService.setUsername(UserEmail)
            this.route.navigate(['/reset-password'], { queryParams: { email: encodeURIComponent(this.encryption.OpenSSLEncrypt(UserEmail))  } });
          }
          else {
            switch(response.status) {
              case HttpStatusCodes.NotAllowed:
                this.route.navigate(['/password-expired']);
                this.apiResponseMessage = response.message;
                break;
              case HttpStatusCodes.ClientErrorBadRequest:
                this.apiResponseMessage = response.message;
                break;
              case HttpStatusCodes.ClientErrorUnauthorized:
                this.apiResponseMessage = response.message;
                break;
                case HttpStatusCodes.ClientDoesNotHaveAccess:
                  this.apiResponseMessage = response.message;
                  break;
              default:
                this.apiResponseMessage = "An error occurred: " + response.message;
                break;
            }
            this.isValidate = true;
            this.error = this.apiResponseMessage; // Set error message here
          }
        },
        error: response => {
          this.error = response.message|| 'Incorrect Credential';
          this.spinnerService.hide();
        },
        complete: () => {
          this.spinnerService.hide();
        },
      });
  
  }


  rememberMe(event: any) {
    this.isRemember = event.target.checked;
    if (event.target.checked && this.loginForm.value.userName) {
      localStorage.setItem('username', this.loginForm.value.userName)
      localStorage.setItem('rememberMe', this.loginForm.value.rememberMe)
    }
    else {
      localStorage.setItem('username', " ")
      localStorage.removeItem('rememberMe');
    }
  }


  TransferLoginData(){
  this.loginDataService.setLoginData(
    {
      locationId : this.locationId,
      locationAddress : this.locationAddress,
      parkingDuration : this.parkingDuration,
    }
  )
  }
}
