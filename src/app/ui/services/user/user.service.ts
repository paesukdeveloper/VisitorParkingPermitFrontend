import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, forkJoin, map, Observable, of, retry, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {apiUrlSetting} from '../../../shared/config/api-setting.config'
import { ApiResponse } from '../../../../shared/models/APIResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient, private loader: NgxSpinnerService) { }

  getInitialData(CouncilId:any) {
    this.loader.show();
    return forkJoin(
      this.GetUserPrefix(),
      this.GetVoucherType(),
      this.GetPermitType(),
      this.GetPermitPeriodDropDown(CouncilId),
      this.GetPermitStatusDropDown(CouncilId),
      this.GetPermitTariffSpecificationDropDown(CouncilId),
      this.GetVehicleMakeDropDown(CouncilId),
      this.GetVehicleFueltypeDropDown(CouncilId),
      this.GetVehicleColourDropDown(CouncilId),
      this.GetDocumentEvidenceProofDropDown(CouncilId),
      this.GetDocumentNameDropDown(CouncilId),
      this.GetWasteType(),
      this.GetGlobalPasswordPolicy(CouncilId)
    ).pipe(retry(0),
      catchError(this.handleError));
  }

  GetuserProfileDetails(userID: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.user
          .userProgfileById, {
        params: {
          encId: userID,
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

  UploadPhoto(requestBody: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .post<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.user
          .uploadPhoto, requestBody
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
            AdditionalData: response.additionalData
          } as ApiResponse)
        )
      );
  }

  SaveUserProfileData(requestData: any) {
    const header = new HttpHeaders({
      'CouncilId' : 1
    })
    const options = {headers: header}
    this.loader.show();
    return this.httpclient
      .post<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.user
          .saveUsers, requestData, options
      )
      .pipe(
        retry(0),
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
  GetUserPrefix(): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.dropdown
          .getUserPrefix
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
            TotalCount: 0,
          } as ApiResponse)
        )
      );
  }

  saveRegisterUserDetails(requestData: any) {
    const header = new HttpHeaders({
      'CouncilId' : 1
    })
    const options = {headers: header}
    this.loader.show();
    return this.httpclient
      .post<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.registration
          .registerUser, requestData, options
      )
      .pipe(
        retry(0),
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

  GetVoucherType(): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.dropdown
          .getVoucherType
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
            TotalCount: 0,
          } as ApiResponse)
        )
      );
  }

  GetPermitType(): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.dropdown
          .getPermitType
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
            TotalCount: 0,
          } as ApiResponse)
        )
      );
  }

  GetDocumentEvidenceProofDropDown(CouncilId: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.dropdown
          .getDocumentEvidenceProof, {
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

  GetDocumentNameDropDown(CouncilId: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.dropdown.getDocumentName, {
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
            TotalCount: response.totalCount,
          } as ApiResponse)
        )
      );
  }

  GetGlobalPasswordPolicy(CouncilId: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.dropdown.getGlobalPasswordPolicy, {
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
            TotalCount: response.totalCount,
          } as ApiResponse)
        )
      );
  }

  GetVehicleColourDropDown(CouncilId: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.dropdown.getVehicleColour, {
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
            TotalCount: response.totalCount,
          } as ApiResponse)
        )
      );
  }

  GetVehicleFueltypeDropDown(CouncilId: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.dropdown.getFuelTypeList, {
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
            TotalCount: response.totalCount,
          } as ApiResponse)
        )
      );
  }
  
  GetPermitTariffSpecificationDropDown(CouncilId: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.permit.getTariffTypeForPermit, {
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
            TotalCount: response.totalCount,
          } as ApiResponse)
        )
      );
  }

  GetVehicleMakeDropDown(CouncilId: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.dropdown.getVehicleMake, {
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
            TotalCount: response.totalCount,
          } as ApiResponse)
        )
      );
  }
  GetPermitStatusDropDown(CouncilId: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.dropdown.getPermitStatus, {
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
            TotalCount: response.totalCount,
          } as ApiResponse)
        )
      );
  }


  GetPermitTypeDropDown(CouncilId: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.dropdown.getPermitType, {
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
            TotalCount: response.totalCount,
          } as ApiResponse)
        )
      );
  }

  GetPermitPeriodDropDown(CouncilId: any): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.dropdown.getPermitPeriod, {
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
            TotalCount: response.totalCount,
          } as ApiResponse)
        )
      );
  }


  GetWasteType(): Observable<ApiResponse> {
    return this.httpclient
      .get<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.dropdown
          .wasteType, {
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
          ({
            Data: response.data,
            Message: response.message,
            Status: response.status,
            TotalCount: 0,
          } as ApiResponse)
        )
      );
  }


  GetAllCount(requestBody: any,CouncilId: any,): Observable<ApiResponse> {
    this.loader.show();
    return this.httpclient
      .post<any>(
        `${environment.apiUrl}` +
        apiUrlSetting.ApiMethods.user
          .getUserApplicationCount, requestBody,{
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
            AdditionalData: response.additionalData
          } as ApiResponse)
        )
      );
  }

    //seraching user using email
  
    SearchExistingUserByEmail(CouncilId: any,  reqBoday: any) {
      this.loader.show();
      return this.httpclient
        .post<any>(
          `${environment.apiUrl}` +
          apiUrlSetting.ApiMethods.user.searchUserUsingEmail,reqBoday ,{
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
              TotalCount: response.totalCount,
            } as ApiResponse)
          )
        );
    }

    GetAllPost(): Observable<ApiResponse> {
      return this.httpclient
        .get<any>(
          `${environment.apiUrl}` +
          apiUrlSetting.ApiMethods.dropdown
            .getAllPostcode
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
