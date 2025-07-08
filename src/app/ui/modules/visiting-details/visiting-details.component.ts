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
import { environment } from '../../../../environments/environment';

interface ParkingDurationOption {
  id: string;
  duration: string; 
  amount: string;
  label?: string;  
}


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
    parkingDuration: ParkingDurationOption[] = [];
    selectedDuration: ParkingDurationOption | null = null;
    endTime : string = ""
    //Terms and conditions 
    termsAndCondition: SafeHtml = ""
    totalAmount: string  = ""
    IsCameraSetup: boolean = false

    optimaTerminalCamera :string =  "";
    optimaVRM: string = ""
    isCameraSetup: boolean = false
    OptimaVehicleImageUrl: string = ''; 
    optimaRawTimedate: string = ''
    transactionIdForVisitorPermit: any


  
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
      this.IsCameraSetup = data.IsCameraSetup
      this.optimaVRM = data.optimaVRM
      this.optimaTerminalCamera = data.optimaTerminalCamera
      this.OptimaVehicleImageUrl = data.OptimaVehicleImageUrl
      this.optimaRawTimedate = data.optimaRawTimedate
      
      this.getWebPagesTermAndConditionById()
    }


    selectDuration(duration: ParkingDurationOption) {
      this.selectedDuration = duration;
      this.endTime = this.calculateEndTime(this.dateAndTime.toString() ,duration.duration)
      this.totalAmount = duration.amount;
    }

     calculateEndTime(startTime:string , duration:string|""):string {
      const startDate = new Date(startTime);
      const [hours, minutes] = duration.split(':').map(Number);
      startDate.setHours(startDate.getHours() + hours);
      startDate.setMinutes(startDate.getMinutes() + minutes);
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
      if(this.IsCameraSetup){
        this.payAndSaveVisitorPermit()
      }
      else{

        this.saveVisitorPermit()
      }
    }

    payAndSaveVisitorPermit(){
      let transactionData = {
        currency: "GBP",
        refno: "",
        amount: this.totalAmount,
        autoSettle: true,
        paymentMethods: [""],
        redirect: {
          successUrl: "",
          cancelUrl: "",
          errorUrl: ""
          },
        option: {returnMobileToken: false}
        }

      let optmaDataModel = {
        id: 0,
        locationId: this.locationId,
        plate: this.optimaVRM,
        terminal:this.optimaTerminalCamera,
        date: this.optimaRawTimedate,
        imageUrl: this.OptimaVehicleImageUrl,
        createdDate: "2025-07-07T11:17:16.430Z",
        createdBy: 0
      }

      const requestBody = {
        optmaDataModel: optmaDataModel,
        transactionData: transactionData,
          vrm:  this.vrm  ,
          locationId:  this.locationId ,
          address: this.locationAddress ,
          startTime: this.dateAndTime,
          endTime: this.endTime,
          emailId: " " ,
          isCameraSetup: this.IsCameraSetup
      }
      console.log(requestBody)
    this.visitorService.savePaymentVisitorParkingPermit(encodeURIComponent(this.securityService.OpenSSLEncrypt(configuration.councilName)
      ), requestBody).subscribe((response)=> {
        if(response.Status == 200 && response.extraData ==null ){
            this.transactionIdForVisitorPermit = response.Data.transactionId;

            window.location.href = `${environment.startTransactionUrl + response.Data.transactionId}`;
        }
        else if(response.Status == 200 && response.extraData == "0"){
            window.location.href = response.Data;
        }
        else if (response.Status === 400) {
          this.toaster.error(response.Message);
        }
        else {
          this.toaster.error(response.Message);
        }
      })
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
