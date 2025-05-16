import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qr-thankyou',
  templateUrl: './qr-thankyou.component.html',
  styleUrl: './qr-thankyou.component.scss'
})
export class QrThankyouComponent implements OnInit {
  locationId: string | null = null;
  constructor(private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.locationId = params.get('locationId');
    });
  }

  registerAnotherVehicle() {
    if (this.locationId) {
      localStorage.removeItem("qrVisitingPermit");
      this.router.navigate(['qr-payment'], { queryParams: { locationId: this.locationId } });
    } else {
      console.error('Location ID not found in query parameters');
    }
  }


}
