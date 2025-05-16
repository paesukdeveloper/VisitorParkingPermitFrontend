import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, retry, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { apiUrlSetting } from '../../../shared/config/api-setting.config';
import { ApiResponse } from '../../../../shared/models/APIResponse';

@Injectable({
  providedIn: 'root'
})
export class CouncilSetupService {

  constructor(private httpclient: HttpClient, private loader: NgxSpinnerService) { }


  
  GetCouncilDetails(councilId:any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.councilsetup
          .getCouncilDetails, {
        params: {
          id: councilId
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
  
  GetCashlessDetails(councilId:any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.Registration
          .GetCashlessDetails, {
        params: {
          CouncilId: 1,
          councilId: 1
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

  // Common Error Handler
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error?.message;
    } else {
      errorMessage = `Error Loading Menu Code: ${error?.status}\n Message: ${error?.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }


}
