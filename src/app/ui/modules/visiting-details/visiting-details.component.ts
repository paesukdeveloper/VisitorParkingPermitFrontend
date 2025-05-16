import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from '../../services/DataTransfer/data-transfer.service';
import { VisitorParkingService } from '../../services/VisitorParking/visitor-parking.service';
import { EncryptionService } from '../../../helpers/security/encryption.service';
import configuration from '../../../../assets/config.json'
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WebpageService } from '../../services/web-page/webpage.service';
import { webpagesContent } from '../../../shared/enums/webpages-content.enum';
@Component({
  selector: 'app-visiting-details',
  templateUrl: './visiting-details.component.html',
  styleUrl: './visiting-details.component.scss'
})
export class VisitingDetailsComponent {

    //for privacy Agreement
    displayStyle = "none";
    locationId!: string;
    locationAddress!: string;
    dateAndTime!: string;
    vrm! : string
    parkingDuration: string[] = [];
    selectedDuration: string | null = null;
    endTime : string = ""
    //Terms and conditions 
    termsAndCondition: SafeHtml = ""

  
    constructor(private dataService: DataTransferService, private route: Router,   private toaster: ToastrService, 
      private visitorService: VisitorParkingService,  private webPageService: WebpageService,private securityService: EncryptionService,private sanitizer: DomSanitizer){}
        
    ngOnInit() {
      let data = this.dataService.getData();
      if (!data || Object.keys(data).length === 0) {
        const storedData = localStorage.getItem('VisitingPermitDetails');
        if (storedData) {
          data = JSON.parse(storedData);
        }
      }
      this.parkingDuration = data.parkingDuration || [];
      this.vrm = data.vrm;
      this.locationId = data.locationId;
      this.locationAddress = data.locationAddress;
      this.dateAndTime = data.dateAndTime;
      this.getWebPagesTermAndConditionById()
    }


    selectDuration(duration: string) {
      this.selectedDuration = duration;
      this.endTime = this.calculateEndTime(this.dateAndTime ,this.selectedDuration)
    }

    calculateEndTime(startTime:string , duration:string|""):string {
      debugger
       const startDate = new Date(startTime);  
       const durationInHours = parseInt(duration, 10);  
      startDate.setHours(startDate.getHours() + durationInHours);
      return startDate.toISOString(); 
    }

    
    

    goBack() {
      this.route.navigate(['/dashboard']);
    }

    RegisterVehicle(){
      this.openPrivacyAgreementPopUp()
    }

    openPrivacyAgreementPopUp(){
      this.displayStyle = "block";
    }

    closePrivacyAgreementPopUp(){
      this.displayStyle = "none";
    }

    agreeAndProceed(){
      this.saveVisitorPermit()
    }

    saveVisitorPermit(){
      if(this.endTime !=""){ 
         let VisitorRegistrationModel = {
      Vrm  : this.vrm ,
      LocationId  : this.locationId ,
      Address  : this.locationAddress ,
      StartTime  : this.dateAndTime ,
      EndTime  : this.endTime ,
     }
        this.visitorService.SaveVisitorParkingPermit(encodeURIComponent(this.securityService.OpenSSLEncrypt(configuration.councilName)
        ), VisitorRegistrationModel).subscribe((response) => {
          if (response.Status === 200) {
            this.route.navigate(['thank-you']);
          }
          else if (response.Status === 400) {
            this.toaster.error(response.Message);
          }
          else {
            this.toaster.error(response.Message);
          }
        })
      }
      else{
         this.toaster.error("Please select a time duration");
      }

    
    }

     getWebPagesTermAndConditionById(){
    this.webPageService.GetWebPageTermsAndConditionsById(
      webpagesContent.visitingVoucher, 
      encodeURIComponent(this.securityService.OpenSSLEncrypt(configuration.councilName)))
    .pipe()
    .subscribe(
      (data:any) => {
        const rawHtml = data.Data?.name; // Assuming 'name' is where HTML is
        this.termsAndCondition =  this.sanitizer.bypassSecurityTrustHtml(rawHtml);
      }
    )
  }
}
