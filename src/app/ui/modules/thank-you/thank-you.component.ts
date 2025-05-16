import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss'
})
export class ThankYouComponent {

  constructor(private route: Router){}
    

  registerAnotherVehicle(){
  localStorage.removeItem("VisitingPermitDetails");
  this.route.navigate(['dashboard'])
  }
}
