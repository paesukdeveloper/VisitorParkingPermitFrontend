import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { apiUrlSetting } from '../config/api-setting.config';
import { TokenModel } from './token-model';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    public jwtHelper: JwtHelperService = new JwtHelperService();
    constructor(private router: Router, private http: HttpClient) {
    }
    async canActivate() {
        let tokens: any;
        let localStorageToken = localStorage.getItem('tokens') ?? '';
        tokens = localStorageToken ? JSON.parse(localStorageToken) as TokenModel : '';

        const token = tokens.token;
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        }
        const isRefreshSuccess = await this.refreshingTokens(token);
        if (!isRefreshSuccess) {
            this.router.navigate(["login"]);
        }
        return isRefreshSuccess;
    }

    private async refreshingTokens(token: string | null): Promise<boolean> {
        let tokens: any;
        let localStorageToken = localStorage.getItem('tokens') ?? '';
        tokens = localStorageToken ? JSON.parse(localStorageToken) as TokenModel : '';
        const refreshToken: string | null = tokens.refreshToken;
        if (!token || !refreshToken) {
            return false;
        }
        const tokenModel = JSON.stringify({ token: token, refreshToken: refreshToken, deviceType: 'web' });
        let isRefreshSuccess: boolean;
        try {
            const response = await lastValueFrom(this.http.post(environment.apiUrl +
                apiUrlSetting.ApiMethods.account_modules.refresh_token, tokenModel));
            const newToken = (<any>response).token;
            const newRefreshToken = (<any>response).refreshToken;
            const tokens: TokenModel = {
                token: newToken,
                refreshToken: newRefreshToken,
                deviceType: 'web'
            }
            let newTokenobj = tokens as TokenModel;
            localStorage.setItem('tokens', JSON.stringify(newTokenobj));
            isRefreshSuccess = true;
        }
        catch (ex) {
            isRefreshSuccess = false;
        }
        return isRefreshSuccess;
    }

}