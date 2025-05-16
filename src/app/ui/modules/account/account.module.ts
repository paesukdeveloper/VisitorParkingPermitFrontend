import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account.routing';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupTypeComponent } from './signup-type/signup-type.component';
import { TwoFactorAuthComponent } from './two-factor-auth/two-factor-auth.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomepageComponent,
    SignupTypeComponent,
    TwoFactorAuthComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
