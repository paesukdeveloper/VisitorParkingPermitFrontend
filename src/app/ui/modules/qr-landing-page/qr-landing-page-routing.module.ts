import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrLandingPageComponent } from './qr-landing-page.component';

const routes: Routes = [

  {
      path:'',
      component:QrLandingPageComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrLandingPageRoutingModule { }
