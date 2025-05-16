import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QrDataTransferService } from '../../services/qrDataTransfer/qr-data-transfer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisitorParkingService } from '../../services/VisitorParking/visitor-parking.service';
import { WebpageService } from '../../services/web-page/webpage.service';
import { EncryptionService } from '../../../helpers/security/encryption.service';
import { webpagesContent } from '../../../shared/enums/webpages-content.enum';
import configuration from '../../../../assets/config.json'
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-qr-details',
  templateUrl: './qr-details.component.html',
  styleUrl: './qr-details.component.scss'
})
export class QrDetailsComponent {
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
    totalAmount: string = ""
    userEmail: string = '';
    transactionIdForVisitorPermit: any






    constructor(private qrDataTransfer: QrDataTransferService, private route: Router,   private toaster: ToastrService, 
      private visitorService: VisitorParkingService,  private webPageService: WebpageService,private securityService: EncryptionService,
      private sanitizer: DomSanitizer){}

    ngOnInit() {
      debugger
      let data = this.qrDataTransfer.getQRData();
      // If no data from the service, try localStorage
      if (!data || Object.keys(data).length === 0) {
        const storedData = localStorage.getItem('qrVisitingPermit');
        if (storedData) {
          data = JSON.parse(storedData);
        }
  }
      this.parkingDuration = data.parkingDuration ;
      this.vrm = data.vrm;
      this.locationId = data.locationId;
      this.locationAddress = data.locationAddress;
      this.dateAndTime = data.startDate;
      this.endTime = data.endTime;
      this.totalAmount = data.totalAmount
      this.getWebPagesTermAndConditionById()
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
      let transactionData = {
      currency: "GBP",
      refno: "",
      amount: this.totalAmount,
      autoSettle: true,
      redirect: {
        successUrl: "",
        cancelUrl: "",
        errorUrl: ""
        }
    }

    const visitorRegistrationModel = {
      vrm: this.vrm,
      locationId: this.locationId,
      address: this.locationAddress,
      startTime: this.dateAndTime,
      endTime: this.endTime,
      emailId: this.userEmail
    }

    const requestBody = {
      visitorRegistrationModel : visitorRegistrationModel,
      transactionData : transactionData,
    }

    this.visitorService.SaveVisitorParkingPermit(encodeURIComponent(this.securityService.OpenSSLEncrypt(configuration.councilName)
  ), requestBody).subscribe((response)=> {
    if(response.Status == 200){
        this.transactionIdForVisitorPermit = response.Data.transactionId;

        window.location.href = `${environment.startTransactionUrl + response.Data.transactionId}`;
    }
    else if (response.Status === 400) {
      this.toaster.error(response.Message);
    }
    else {
      this.toaster.error(response.Message);
    }
  })






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
