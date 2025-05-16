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
    constructor(private qrDataTransfer: QrDataTransferService, private route: Router,   private toaster: ToastrService, 
      private visitorService: VisitorParkingService,  private webPageService: WebpageService,private securityService: EncryptionService,
      private sanitizer: DomSanitizer){}

       ngOnInit() {
        debugger
      const data = this.qrDataTransfer.getQRData();
      this.parkingDuration = data.parkingDuration || [];
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
