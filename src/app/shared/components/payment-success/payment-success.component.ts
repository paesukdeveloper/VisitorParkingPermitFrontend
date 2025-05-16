import { Component } from '@angular/core';
import { PermitDetailsService } from '../../../ui/services/permit-details/permit-details.service';
import { EncryptionService } from '../../services/encryption.service';
import { ActivatedRoute, Router } from '@angular/router';
import configuration from '../../../../assets/config.json'
@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html'
})
export class PaymentSuccessComponent {
  isSuccess:boolean = true;

  constructor(private service: PermitDetailsService, private securityService: EncryptionService,
    private route: Router,private Activatedroute: ActivatedRoute
  ) { 
    this.isSuccess = this.Activatedroute.snapshot.url[0].path == 'payment-success' ? true : false;
  }
  ngOnInit() {
    let transactionId = localStorage.getItem('transactionId');
    if (transactionId != null && transactionId != undefined && transactionId != "") {
      localStorage.removeItem('transactionId');
      this.service.SaveTransactionHistory(encodeURIComponent(this.securityService.OpenSSLEncrypt(configuration.councilName)), transactionId)
        .subscribe(
          (data: any) => {
            this.route.navigate(['/permit-voucher-approval/manage-voucher-approval'], {
              queryParams: {
                Id: data.Data
              },
            });
          }
        );
    }
  }






}
