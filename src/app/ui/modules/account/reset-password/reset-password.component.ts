import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { EncryptionService } from '../../../../helpers/security/encryption.service';
import { TokenModel } from '../../../../view-models/token-model';
import { noWhitespaceValidator } from '../../../../../validators/nospacevalidator';
import { AuthService } from '../../../../shared/auth/auth.service';
import { HttpStatusCodes } from '../../../../shared/enums/http-status-codes.enum';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {

  public jwtHelper: JwtHelperService = new JwtHelperService();
  resetPasswordForm!: FormGroup
  emailFromUrl: string | undefined;
  isNewPasswordShow = false;
  isCnfPasswordShow = false;
  error = '';
  apiResponseMessage = '';
  submitted = false;
  isValidate = false;
  isRemember = localStorage.getItem('username')?.toString() ? true : false;
  newPasswordFieldType: string = 'password';// for password show/hide
  cnfPasswordFieldType: string = 'password';// for password show/hide
  constructor(
    private route: Router,
    private spinnerService: NgxSpinnerService,
    private authenticationService: AuthService,
    private formBuilder: FormBuilder,
    private encryption: EncryptionService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: ActivatedRoute
  ) {


  }

  ngOnInit(): void {
    const localStoragepassword = localStorage.getItem('password');
    const localStorageConfirmPassword = localStorage.getItem('confirmPassword');
    const localStorageOtp = localStorage.getItem('otp');

    this.activatedRoute.queryParams.subscribe(params => {
      const decodedEmail = decodeURIComponent(params['email'])
      const email = this.encryption.OpenSSLDecrypt(decodedEmail)
      const emailFetched = this.router.snapshot.queryParams['email'] || " "
      this.emailFromUrl = params['email'] ? email : emailFetched;
    });

    this.resetPasswordForm = this.formBuilder.group({
      password: [this.isRemember ? localStoragepassword : null, [Validators.required]],
      confirmPassword: [this.isRemember ? localStorageConfirmPassword : null, [Validators.required]],
      otp: [this.isRemember ? localStorageOtp : null, [Validators.required, noWhitespaceValidator, this.maxLengthValidator(6)]]
    }, { validator: this.passwordMatchValidator });
  }


  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { passwordMismatch: true };
  }

  maxLengthValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value ? control.value.length : 0;
      return value > maxLength ? { 'maxLength': { value: control.value } } : null;
    };
  }
  showNewPassword() {
    this.isNewPasswordShow = !this.isNewPasswordShow;

  }
  showCnfPassword() {
    this.isCnfPasswordShow = !this.isCnfPasswordShow;
  }

  onNumberInput(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  get f() { return this.resetPasswordForm.controls; }

  onResetClick() {
    const ResetPassData = {
      ...this.resetPasswordForm.value,
      email: this.emailFromUrl
    }
    this.resetPasswordForm.markAllAsTouched();
    this.submitted = true;
    if (this.resetPasswordForm.get('otp')?.value == " ") {
      this.error = 'OTP required';
      return;
    }
    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.spinnerService.show(undefined, {
      type: 'timer',
      fullScreen: true
    });
    const requestData = {
      password: encodeURIComponent(this.encryption.OpenSSLEncrypt(ResetPassData.password)),
      // confirmPassword: encodeURIComponent(this.encryption.OpenSSLEncrypt(ResetPassData.confirmPassword)),
      email: ResetPassData.email,
      otp: ResetPassData.otp
    }
    this.authenticationService.resetPassword(requestData)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.spinnerService.hide();
          if (response.status === HttpStatusCodes.SuccessOK) {
            this.apiResponseMessage = response.message
            this.toastr.success('Password Reset successfully', 'Success')
            this.route.navigate(['/login']);
          } else {
            switch (response.status) {
              case HttpStatusCodes.NotAllowed:
                this.route.navigate(['/otp-expired']);
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
        error: (error) => {
          this.error = error;
          this.spinnerService.hide();
        },
        complete: () => {
          this.spinnerService.hide();
        }
      });
  }

}
