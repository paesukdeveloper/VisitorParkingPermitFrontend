import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountModule } from './ui/modules/account/account.module';
import { LayoutModule } from './ui/layout/layout.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthTokenInterceptor } from './shared/auth/auth-token-interceptor';
import { EncryptionService } from './helpers/security/encryption.service';
import { AuthGuard } from './shared/auth/auth-guard';
import { ToastrModule } from 'ngx-toastr';
import { ThankYouComponent } from './ui/modules/thank-you/thank-you.component';
import { QrLandingPageComponent } from './ui/modules/qr-landing-page/qr-landing-page.component';
import { QrDetailsComponent } from './ui/modules/qr-details/qr-details.component';
import { QrThankyouComponent } from './ui/modules/qr-thankyou/qr-thankyou.component';


@NgModule({
  declarations: [
    AppComponent,
    ThankYouComponent,
    QrLandingPageComponent,
    QrDetailsComponent,

    
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccountModule,
    LayoutModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    EncryptionService,
    AuthGuard,
    provideClientHydration(),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
