import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EncryptionService } from '../../../../helpers/security/encryption.service';
import { noWhitespaceValidator } from '../../../../../validators/nospacevalidator';
import { first } from 'rxjs';
import { HttpStatusCodes } from '../../../../shared/enums/http-status-codes.enum';

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
})
export class TwoFactorAuthComponent {
  twofaForm!: FormGroup;
  userName: any = localStorage.getItem('username');
  userDeatils: any =JSON.parse(localStorage.getItem('userDeatils')!);
  submitted = false;
  phoneshow: boolean = false;
  emailshow: boolean = false;
  codeShow: boolean = true;
  is2FAEnabledEmail: boolean = false;
  is2FAEnabledSMS: boolean = false;
  apiResponseMessage = '';
  error = '';


  constructor(private route: Router,
    private spinnerService: NgxSpinnerService,
    private authenticationService: AuthService,
    private formBuilder: FormBuilder,
    private encryption: EncryptionService) {

  }

  ngOnInit() {
    if(this.userDeatils.is2FAEnabledEmail && this.userDeatils.is2FAEnabledSMS)
    {
      this.is2FAEnabledEmail = this.emailshow= this.userDeatils.is2FAEnabledEmail;
      this.is2FAEnabledSMS = this.userDeatils.is2FAEnabledSMS;
    }
    else{
      this.is2FAEnabledEmail = this.emailshow= this.userDeatils.is2FAEnabledEmail;
      this.is2FAEnabledSMS = this.phoneshow = this.userDeatils.is2FAEnabledSMS;
    }   
    

    this.twofaForm = this.formBuilder.group({
      email:  { value: this.userName, disabled: true },
      phone: { value: this.userDeatils.phoneNumber, disabled: true },
      otp: ['', [Validators.required, noWhitespaceValidator, this.maxLengthValidator(6)]]
    });

  }
  get f() { return this.twofaForm.controls; }
  maxLengthValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value ? control.value.length : 0;
      return value > maxLength ? { 'maxLength': { value: control.value } } : null;
    };
  }

  onNumberInput(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  onPhoneShow() {
    this.phoneshow = true;
    this.emailshow = false;
  }
  onEmailShow() {
    this.emailshow = true;
    this.phoneshow = false;
  }
  codeSent() {
    this.codeShow = false;
  }

  ResendCode() {
    this.spinnerService.show()
    const email = this.twofaForm.get('email')?.value; 
    this.authenticationService.resendCode(email)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.spinnerService.hide()
          if (response.status === HttpStatusCodes.SuccessOK) {
            this.apiResponseMessage = response.message;
            this.error = this.apiResponseMessage;
          } else {
            switch (response.status) {
              case HttpStatusCodes.NotAllowed:
                this.route.navigate(['/otp-expired']);
                break;
              case HttpStatusCodes.ClientErrorBadRequest:
              case HttpStatusCodes.ClientErrorUnauthorized:
              case HttpStatusCodes.ClientDoesNotHaveAccess:
                this.apiResponseMessage = response.message;
                break;
              default:
                this.apiResponseMessage = "An error occurred: " + response.message;
                break;
            }
            
            this.error = this.apiResponseMessage; // Set error message here
          }
        },
        error: (error) => {
          this.spinnerService.hide()
          this.error = error.message || "An unexpected error occurred";
        }
      });
  }

  ResendCodeToPhoneNumber() {
    this.spinnerService.show()
    const email = this.twofaForm.get('phone')?.value; 
    this.authenticationService.resendCode(email)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.spinnerService.hide()
          if (response.status === HttpStatusCodes.SuccessOK) {
            this.apiResponseMessage = response.message;
            this.error = this.apiResponseMessage;
          } else {
            switch (response.status) {
              case HttpStatusCodes.NotAllowed:
                this.route.navigate(['/otp-expired']);
                break;
              case HttpStatusCodes.ClientErrorBadRequest:
              case HttpStatusCodes.ClientErrorUnauthorized:
              case HttpStatusCodes.ClientDoesNotHaveAccess:
                this.apiResponseMessage = response.message;
                break;
              default:
                this.apiResponseMessage = "An error occurred: " + response.message;
                break;
            }
            
            this.error = this.apiResponseMessage; // Set error message here
          }
        },
        error: (error) => {
          this.spinnerService.hide()
          this.error = error.message || "An unexpected error occurred";
        }
      });
  }

  onVerifyClick() {
    const twoFaData = {
      ...this.twofaForm.value,
      userName: this.twofaForm.get('email')?.value // getting the username from AuthService
    };
    this.twofaForm.markAllAsTouched();

    this.submitted = true;
    // stop here if form is invalid
    if (this.twofaForm.invalid) {
      return;
    }


    const requestData = {
      username: twoFaData.userName,
      otp: twoFaData.otp
    };

    this.spinnerService.show(undefined, {
      type: 'timer',
      fullScreen: true
    });

    this.authenticationService.verify2FA(requestData)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.spinnerService.hide();
          if (response.status === HttpStatusCodes.SuccessOK) {
            this.route.navigate(['/dashboard']);
          } else {
            switch (response.status) {
              case HttpStatusCodes.NotAllowed:
                this.route.navigate(['/otp-expired']);
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
            this.error = this.apiResponseMessage; // Set error message here
          }
        },
        error: (error) => {
          this.spinnerService.hide();
          this.error = error.otp;
        },
        complete: () => {
          this.spinnerService.hide();
        }
      });
  }
}
