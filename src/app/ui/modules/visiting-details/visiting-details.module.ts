import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitingDetailsRoutingModule } from './visiting-details.routing';
import { SharedModule } from '../shared/shared.module';
import { VisitingDetailsComponent } from './visiting-details.component';


@NgModule({
  declarations: [VisitingDetailsComponent],
  imports: [
    SharedModule,
    CommonModule,
    VisitingDetailsRoutingModule
  ]
})
export class VisitingDetailsModule { }
