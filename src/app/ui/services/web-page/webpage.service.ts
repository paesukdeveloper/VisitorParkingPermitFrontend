import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, forkJoin, map, Observable, of, retry, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {apiUrlSetting} from '../../../shared/config/api-setting.config'
import { ApiResponse } from '../../../../shared/models/APIResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WebpageService {

  constructor(private httpclient: HttpClient, private loader: NgxSpinnerService) { }

  SaveWebpage(CouncilId: any,requestBody:any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .post<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.webpage
          .saveWebPage,requestBody, {
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
            TotalCount: 0,
          } as ApiResponse)
        )
      );
  }

  GetWebpageData(requestBody: any) {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      CouncilId: '1'
    });
    return this.httpclient
      .post<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.webpage
          .getWebpage, requestBody,{headers: httpHeaders}
      )
      .pipe(
        retry(0),
        catchError(this.handleError),
        map(
          (response) =>
          ({
            Data: response.data,
            Message: response.message,
            Status: response.status,
            TotalCount: response.totalCount,
          } as ApiResponse)
        )
      );
  }

  UpdateActiveStatusWebpage(requestBody:any): Observable<ApiResponse> {     
    this.loader.show();
    return this.httpclient
      .post<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.webpage
          .updateActiveStatusWebpage,requestBody, {
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
          (this.loader.hide(), {
            Data: response.data,
            Message: response.message,
            Status: response.status,
            TotalCount: 0,
          } as ApiResponse)
        )
      );
  }

  GetWebPageById(Id: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.webpage.getWebPageById, {
        params: {
          encId: Id,
          CouncilId: '1'
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


  GetWebPageTermsAndConditionsById(Id: any, councilId:any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.webpage.getWebPageTermsAndConditionsById, {
        params: {
          Id: Id,
          CouncilId: councilId
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
