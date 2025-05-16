import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { DataTransferService } from '../../services/DataTransfer/data-transfer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferLoginDataService } from '../../services/transfer-login-data/transfer-login-data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  VisitorParkingForm!: FormGroup;

  locationId :string = ""
  locationAddress: string = ""
  parkingDuration: [] = []
  dateAndTime:Date = new Date();
  loginData!: []


  constructor(private dataService: DataTransferService, private route: Router,  
    private formBuilder: FormBuilder, private loginDataService: TransferLoginDataService,
     private authenticationService: AuthService,) {}


  ngOnInit() {
    this.VisitorParkingForm = this.formBuilder.group({
      vrm: ['', [Validators.required]]
    });
     const loginData =this.loginDataService.getLoginData()
    console.log(loginData)
    this.locationId = loginData.locationId
    this.locationAddress = loginData.locationAddress
    this.parkingDuration = loginData.parkingDuration
  }


  onLogoutClick() {
    this.authenticationService.logout();
  }

 
  agreeAndProceed(){
     this.VisitorParkingForm.markAllAsTouched();
   
    if (this.VisitorParkingForm.invalid) {
      return; 
    }
    else{
    this.dataService.setData({
      vrm :  this.VisitorParkingForm.value.vrm,
      locationId: this.locationId,
      locationAddress: this.locationAddress,
      dateAndTime: this.dateAndTime,
      parkingDuration: this.parkingDuration
        });
    this.route.navigate(['Parking-details']);
    }
      
  }

  
}
