import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../../shared/auth/auth-guard';

const routes: Routes = [
{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: '',
      loadChildren: () =>
        import('../modules/dashboard/dashboard.module').then(
          (m) => m.DashboardModule
        ),
        canActivate: [AuthGuard]
    },
   
    {
      path: 'dashboard',
      loadChildren: () =>
        import('../modules/dashboard/dashboard.module').then(
          (m) => m.DashboardModule
        ),
        canActivate: [AuthGuard]
    },
    {
      path: 'Parking-details',
      loadChildren: () =>
        import('../modules/visiting-details/visiting-details.module').then(
          (m) => m.VisitingDetailsModule
        ),
        canActivate: [AuthGuard]
    },
    {
      path: 'thank-you',
      loadChildren: () =>
        import('../modules/thank-you/thank-you.module').then(
          (m) => m.ThankYouModule
        ),
        canActivate: [AuthGuard]
    },
 {
      path: 'qr-details',
      loadChildren: () =>
        import('../modules/qr-details/qr-details.module').then(
          (m) => m.QrDetailsModule
        ),
    },
  ]
}


];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
