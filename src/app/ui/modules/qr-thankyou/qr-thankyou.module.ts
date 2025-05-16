import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrThankyouRoutingModule } from './qr-thankyou-routing.module';
import { QrThankyouComponent } from './qr-thankyou.component';


@NgModule({
  declarations: [
    QrThankyouComponent
  ],
  imports: [
    CommonModule,
    QrThankyouRoutingModule
  ]
})
export class QrThankyouModule { }
