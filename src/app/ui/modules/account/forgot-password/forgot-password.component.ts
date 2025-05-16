import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EncryptionService } from '../../../../helpers/security/encryption.service';
import { AuthService } from '../../../../shared/auth/auth.service';
import { first } from 'rxjs';
import { HttpStatusCodes } from '../../../../shared/enums/http-status-codes.enum';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm! : FormGroup;
  submitted = false;
  isValidate = false;
  isRemember = localStorage.getItem('email')?.toString() ? true : false
  error = '';
  apiResponseMessage = '';

    constructor(private formBuilder: FormBuilder,
      private spinnerService: NgxSpinnerService,
      private authenticationService: AuthService,
      private encryption: EncryptionService,
      private route: Router,
    ) { 
      // this.forgotPasswordForm = this.formBuilder.group({
      //   email: [null, [Validators.required] ],
      // })
    }
  
    ngOnInit() {
      this.isRemember = localStorage.getItem('rememberMe') === 'true';
      const localStorageUsername = localStorage.getItem('email');    
  
      this.forgotPasswordForm = this.formBuilder.group({
        email: [this.isRemember ? localStorageUsername : null, [Validators.required]],
     
      });
    }
    get f() { return this.forgotPasswordForm.controls; }
    
    onForgotPaawordClick(){     
  
      // Mark the email field as touched
      this.forgotPasswordForm.controls['email'].markAsTouched();
   
      this.submitted = true;
      // stop here if form is invalid
      if (this.forgotPasswordForm.invalid) {
      
       return;
     }
      this.spinnerService.show(undefined, {
        type: 'timer',
          fullScreen: true
      });
       
    const email = this.forgotPasswordForm.value.email
     this.authenticationService.forgotPassword(email)
     .pipe(first())
       .subscribe({
         next: (response) => {
           if (response.status === HttpStatusCodes.SuccessOK ) {
             this.authenticationService.setUsername(email)
             this.route.navigate(['/reset-password'], { queryParams: { email: encodeURIComponent(this.encryption.OpenSSLEncrypt(email))  } });
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
  
  }
  
