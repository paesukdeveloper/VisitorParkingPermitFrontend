import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, throwError, retry } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../../models/user';
import { apiUrlSetting } from '../config/api-setting.config';
import { TokenModel } from './token-model';
import { UserProfile } from './user-profile';
import { ApiResponse } from '../../../shared/models/APIResponse';

// existing code hidden for display purpose

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private username: string = '';
    private userSubject: BehaviorSubject<User>;
    isApiCall = false;
    public user: Observable<User>;
    constructor(private httpClient: HttpClient, private router: Router) {
        const userJson = localStorage.getItem('currentUser');
        this.userSubject = new BehaviorSubject<User>(userJson !== null ? JSON.parse(userJson) : new User());
        this.user = this.userSubject.asObservable();
    }
    userProfile = new BehaviorSubject<UserProfile | null>(null);
    jwtService: JwtHelperService = new JwtHelperService();
    getUsername(): string {
        return this.username;
    }
    setUsername(username: string) {
        this.username = username;
        // Store the username in localStorage
        localStorage.setItem('username', username);
    }

    login(requestData: any) {
        return this.httpClient.post<any>(`${environment.apiUrl}` + apiUrlSetting.ApiMethods.account_modules.login, requestData)
            .pipe(map(response => {
                if (response.status === 200) {
                    const tokens: TokenModel = {
                        token: response.data.jwtToken,
                        refreshToken: response.data.refreshToken,
                        deviceType: 'web'
                    }
                    let token = tokens as TokenModel;
                    localStorage.setItem('tokens', JSON.stringify(token));
                    localStorage.setItem('userDeatils', JSON.stringify(response.data.user));
                    localStorage.setItem('userAccess', JSON.stringify(response.data.user.modules))
                    let userInfo = this.jwtService.decodeToken(
                        token.token
                    ) as UserProfile;
                    this.userProfile.next(userInfo);
                }
                return response;
            }));
    }

    forgotPassword(email: string) {
        const url = `${environment.apiUrl}${apiUrlSetting.ApiMethods.forgot_password.forgotPassword}`;
        const params = new HttpParams().set('email', email);

        return this.httpClient.get<any>(url, { params })
            .pipe(map(response => {
                return response;
            }));
    }
    resetPassword(requestData: any) {
        return this.httpClient.post<any>(`${environment.apiUrl}` + apiUrlSetting.ApiMethods.forgot_password.resetPassword, requestData)

    }

    getAccessToken(): string {
        let localStorageToken = localStorage.getItem('tokens');
        if (localStorageToken) {
            var token = JSON.parse(localStorageToken) as TokenModel;
            let userInfo = this.jwtService.decodeToken(
                token.token
            ) as UserProfile;
            this.userProfile.next(userInfo);
            return token.token;
        }
        else {
            this.router.navigate(['/']);
        }
        return "";
    }

    refreshToken(payload: TokenModel) {
        return this.httpClient.post<TokenModel>(
            `${environment.apiUrl}` + apiUrlSetting.ApiMethods.account_modules.refresh_token,
            payload
        );
    }

    logout() {
        const userName = localStorage.getItem('username') ?? '';
        this.userSubject.next({});
        localStorage.clear();
        if (userName)
            localStorage.setItem('username', userName);
        this.router.navigate(['/login']);
    }

    changePassword(requestBody: any): Observable<ApiResponse> {
        const header = new HttpHeaders({
            'CouncilId': 1
        })
        const options = { headers: header }
        return this.httpClient
            .post<any>(
                `${environment.apiUrl}` +
                apiUrlSetting.ApiMethods.forgot_password
                    .changePassword, requestBody, options
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
                        Error: response.error,
                    } as ApiResponse)
                )
            );
    }

    verify2FA(requestData: any) {
        return this.httpClient.post<any>(`${environment.apiUrl}` + apiUrlSetting.ApiMethods.account_modules.loginWithOTP, requestData)
            .pipe(map(response => {
                if (response.status === 200) {
                    const user = response.data.user;

                    // Check if 2FA is enabled
                    if (response.data.jwtToken) {
                        const tokens: TokenModel = {
                            token: response.data.jwtToken,
                            refreshToken: response.data.refreshToken,
                            deviceType: 'web'
                        };

                        localStorage.setItem('tokens', JSON.stringify(tokens));
                        localStorage.setItem('userDetails', JSON.stringify(user));
                        localStorage.setItem('userAccess', JSON.stringify(user.modules));

                        let userInfo = this.jwtService.decodeToken(tokens.token) as UserProfile;
                        this.userProfile.next(userInfo);

                    } else {
                        // Handle the case when 2FA is not enabled
                        localStorage.setItem('userDetails', JSON.stringify(user));
                        localStorage.setItem('userAccess', JSON.stringify(user.modules));
                        // clear existing tokens if any
                        localStorage.removeItem('tokens');
                        this.userProfile.next(null); // Or set a default user profile
                    }
                }
                return response;
            }));
    }

    resendCode(email: string) {
        const url = `${environment.apiUrl}${apiUrlSetting.ApiMethods.account_modules.resendCode}`;
        const params = new HttpParams().set('email', email);

        return this.httpClient.get<any>(url, { params })
            .pipe(map(response => {
                return response;
            })); 
    }


    private handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error?.message;
        } else {
            errorMessage = `Error Loading Menu Code: ${error?.status}\n Message: ${error?.message}`;
        }
        return throwError(errorMessage);
    }
}