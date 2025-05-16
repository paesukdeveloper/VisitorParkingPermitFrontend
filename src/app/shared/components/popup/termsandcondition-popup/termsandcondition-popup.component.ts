import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WebpageService } from '../../../../ui/services/web-page/webpage.service';
import { webpagesContent } from '../../../enums/webpages-content.enum';
import { EncryptionService } from '../../../services/encryption.service';
import configuration from '../../../../../assets/config.json'
@Component({
  selector: 'app-termsandcondition-popup',
  templateUrl: './termsandcondition-popup.component.html',
  styleUrls: ['./termsandcondition-popup.component.scss']
})
export class TermsandConditionPopupComponent implements OnInit {

  isCheckedTermsandCondition:boolean = false;
  isOldCheckedTermsandCondition:boolean = false;
     //Terms and conditions 
    termsAndCondition: SafeHtml = ""
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private webPageService: WebpageService, private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<TermsandConditionPopupComponent>,
   ) {
      this.isCheckedTermsandCondition = data.isCheckedTermsandCondition;
      this.isOldCheckedTermsandCondition = data.isCheckedTermsandCondition;
    }

  onConfirm() {
    this.dialogRef.close(this.isCheckedTermsandCondition);
  }
  ngOnInit(): void {
    this.getWebPagesTermAndConditionById() // For getting terms and conditions
  }

  onCancel(){
    if(this.isOldCheckedTermsandCondition){
      this.dialogRef.close(this.isOldCheckedTermsandCondition);
    }
  }

    getWebPagesTermAndConditionById(){
      this.webPageService.GetWebPageTermsAndConditionsById(
        webpagesContent.visitingVoucher, 
        1)
      .pipe()
      .subscribe(
        (data:any) => {
          const rawHtml = data.Data?.name; // Assuming 'name' is where HTML is
          this.termsAndCondition =  this.sanitizer.bypassSecurityTrustHtml(rawHtml);
        }
      )
    }
}
