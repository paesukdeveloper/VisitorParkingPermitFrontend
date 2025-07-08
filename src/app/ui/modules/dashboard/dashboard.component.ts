import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { DataTransferService } from '../../services/DataTransfer/data-transfer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferLoginDataService } from '../../services/transfer-login-data/transfer-login-data.service';
import { VisitorParkingService } from '../../services/VisitorParking/visitor-parking.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  VisitorParkingForm!: FormGroup;
  displayStyle = "none";
  locationId :string = ""
  locationAddress: string = ""
  parkingDuration: [] = []
  dateAndTime:Date = new Date();
  loginData!: [];

  optimaTerminalCamera :string =  "";
  optimaVRM: string = ""
  optimaVecEnteredTime: string = ""
  optimaVecEnteredDate: string = ""
  isCameraSetup: boolean = false
  OptimaVehicleImageUrl: string = ''; 
  optimaRawTimedate: string = ''


  constructor(private dataService: DataTransferService, private route: Router,  private toaster: ToastrService, 
    private formBuilder: FormBuilder, private loginDataService: TransferLoginDataService,
     private authenticationService: AuthService,private visitorService: VisitorParkingService, private loader: NgxSpinnerService,) {}


  ngOnInit() {
    this.VisitorParkingForm = this.formBuilder.group({
      vrm: ['', [Validators.required]]
    });
    const loginData =this.loginDataService.getLoginData()
    
    this.locationId = loginData.locationId
    this.locationAddress = loginData.locationAddress
    this.parkingDuration = loginData.parkingDuration
    this.isCameraSetup = loginData.isCameraSetup
    this.getVisitorDetailsByLocationId(this.locationId)
  }


  onLogoutClick() {
    this.authenticationService.logout();
  }

 
  agreeAndProceed(){
  
   
    if (this.VisitorParkingForm.invalid) {
      return; 
    }
    // else if(this.VisitorParkingForm.value.vrm != this.optimaVRM){
    //   this.toaster.error("Entred VRM does not matched with the fetched VRM");
    //   return;
    // }
    else{
      const data = 
      { 
        vrm :  this.VisitorParkingForm.value.vrm,
        locationId: this.locationId,
        locationAddress: this.locationAddress,
        dateAndTime: this.dateAndTime,
        parkingDuration: this.parkingDuration,
        IsCameraSetup: this.isCameraSetup,
         optimaTerminalCamera: this.optimaTerminalCamera ,
         optimaVRM: this.optimaVRM,
         OptimaVehicleImageUrl: this.OptimaVehicleImageUrl,
         optimaRawTimedate: this.optimaRawTimedate,
      }
      
     this.dataService.setData(data);
     localStorage.setItem('VisitingPermitDetails', JSON.stringify(data));
    this.route.navigate(['Parking-details']);
    }
      
  }



   VerifyVehicle(){
    this.getDetailsFromOptima()
    
    }

    openVechConfirmPopUp(){
      this.displayStyle = "block";
    }

     closeVechConfirmPopUp(){
      this.displayStyle = "none";
    }


    getDetailsFromOptima(){
    this.VisitorParkingForm.markAllAsTouched();
    if (this.VisitorParkingForm.invalid) {
      return; 
    }
    else{
       this.visitorService.GetLaneTypeDropdownDetails().subscribe((response) => {
          if (response.Status === 200) {
            this.optimaTerminalCamera = response.Data.terminal
            this.optimaVRM = response.Data.plate
              const rawDate = response.Data.date; // "2025-07-04T18:00:11.525852"
              const parsedDate = new Date(rawDate);

        // Format to: "04 July 2025"
        const formattedDate = parsedDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });

        // Format to: "6:00 PM"
        const formattedTime = parsedDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        this.optimaRawTimedate = response.Data.date
        this.optimaVecEnteredTime = `${formattedTime}`; 
        this.optimaVecEnteredDate = `${formattedDate}`; 
        this.OptimaVehicleImageUrl = response.Data.imageUrl
        this.openVechConfirmPopUp()
      
      }
      else if (response.Status === 400) {}
      else {}
      })
    }
    }

      getVisitorDetailsByLocationId(locationId: string){
         this.visitorService.GetVisitorVoucherByLocationId(this.locationId)
      .subscribe(data=>{        
        this.locationId = data.Data.locationId
        this.locationAddress = data.Data.address
        this.parkingDuration = data.Data.parkingDurations.map((option: any) => ({
          ...option,
          label: this.formatDuration(option.duration)
        }));
      });
      }
  

  formatDuration(duration: string): string {
    const [hours, minutes] = duration.split(':').map(Number);
    let label = '';
    if (hours) label += `${hours} hr${hours > 1 ? 's' : ''}`;
    if (minutes) label += (label ? ' ' : '') + `${minutes} min${minutes > 1 ? 's' : ''}`;
    return label || '0 mins';
  }
}
