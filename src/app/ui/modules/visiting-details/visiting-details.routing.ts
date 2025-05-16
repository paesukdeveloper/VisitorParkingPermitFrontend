import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitingDetailsComponent } from './visiting-details.component';

const routes: Routes = [

   {
        path: '',
        component: VisitingDetailsComponent
      },
     
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitingDetailsRoutingModule { }
