import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrThankyouComponent } from './qr-thankyou.component';

const routes: Routes = [
  
      {
        path: '',
        component: QrThankyouComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrThankyouRoutingModule { }
