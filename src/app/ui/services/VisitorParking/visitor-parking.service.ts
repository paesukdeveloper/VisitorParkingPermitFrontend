import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { ApiResponse } from '../../../../shared/models/APIResponse';
import { environment } from '../../../../environments/environment';
import { apiUrlSetting } from '../../../shared/config/api-setting.config';

@Injectable({
  providedIn: 'root'
})
export class VisitorParkingService {

  constructor(private httpclient: HttpClient, private loader: NgxSpinnerService) { }

    SaveVisitorParkingPermit(CouncilId: any, requestBody: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .post<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.Visitor.saveVisitorVrm, requestBody, {
        params: {
          CouncilId: CouncilId
        }
      }
      )
      .pipe(
        retry(0),
        catchError(this.handleError),
        map(
          (response) =>
          (this.loader.hide(), {
            Data: response.data,
            Message: response.message,
            Status: response.status,
            AdditionalData:response.additionalData,
            TotalCount: 0,
          } as ApiResponse)
        )
      );
  }

   GetVisitorVoucherByLocationId(locationId: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.Visitor
          .GetVisitorVoucherByLocationId, {
        params: {
          locationId: locationId,
          CouncilId : 1
        }
      }
      )
      .pipe(
        retry(0),
        catchError(this.handleError),
        map(
          (response) =>
          (this.loader.hide(), {
            Data: response.data,
            Message: response.message,
            Status: response.status,
            TotalCount: 0,
          } as ApiResponse)
        )
      );
  }


   qrPayment(CouncilId: any, requestBody: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .post<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.Visitor.transactionInitVisitorVoucher, requestBody, {
        params: {
          CouncilId: CouncilId
        }
      }
      )
      .pipe(
        retry(0),
        catchError(this.handleError),
        map(
          (response) =>
          (this.loader.hide(), {
            Data: response.data,
            Message: response.message,
            Status: response.status,
            AdditionalData:response.additionalData,
            extraData : response.extraData ?? null,
            TotalCount: 0,
          } as ApiResponse)
        )
      );
  }


   GetLaneTypeDropdownDetails(): Observable<ApiResponse> {
    this.loader.show()
       return this.httpclient
         .get<any>(
           `${environment.apiUrl}` +
           apiUrlSetting.ApiMethods.Optima
             .GetLastDetailsViaOptima, {
           params: {
             CouncilId: '1'
           }
         }
         )
         .pipe(
           retry(0),
           catchError(this.handleError),
           map(
             (response) =>
             (this.loader.hide(),{
               Data: response.data,
               Message: response.message,
               Status: response.status,
               TotalCount: 0,
             } as ApiResponse)
           )
         );
     }


    savePaymentVisitorParkingPermit(CouncilId: any, requestBody: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .post<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.Visitor.saveVrmPayment, requestBody, {
        params: {
          CouncilId: CouncilId
        }
      }
      )
      .pipe(
        retry(0),
        catchError(this.handleError),
        map(
          (response) =>
          (this.loader.hide(), {
            Data: response.data,
            Message: response.message,
            Status: response.status,
            AdditionalData:response.additionalData,
            TotalCount: 0,
          } as ApiResponse)
        )
      );
  }



   private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error?.message;
    } else {
      errorMessage = `Erro Code: ${error?.status}\n Message: ${error?.message}`;
    }
    return throwError(errorMessage);
  }

}
