import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/auth-guard';
import { DashboardComponent } from './ui/modules/dashboard/dashboard.component';
import { ThankYouComponent } from './ui/modules/thank-you/thank-you.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../src/app/ui/modules/account/account.module').then(
        (m) => m.AccountModule
      )
  },
  {
    path: 'layout',
    loadChildren: () =>
      import('../../src/app/ui/layout/layout.module').then(
        (m) => m.LayoutModule
      ),
    data: { requiredAuth: true }, canActivate: [AuthGuard]
  },
    {
    path: 'qr-payment',
    loadChildren: () =>
      import('../../src/app/ui/modules/qr-landing-page/qr-landing-page.module').then(
        (m) => m.QrLandingPageModule
      ), // No AuthGuard here
  },
  {
      path: 'qr-details',
      loadChildren: () =>
        import('../../src/app/ui/modules/qr-details/qr-details.module').then(
          (m) => m.QrDetailsModule
        ),
    },
   {
      path: 'qr-thankyou',
      loadChildren: () =>
        import('../../src/app/ui/modules/qr-thankyou/qr-thankyou.module').then(
          (m) => m.QrThankyouModule
        ),
    },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
