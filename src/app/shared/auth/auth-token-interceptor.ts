import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, switchMap, take, throwError, of } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenModel } from './token-model';
import { UserProfile } from './user-profile';
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    public jwtHelper: JwtHelperService = new JwtHelperService();
    
    constructor(
        private authService: AuthService,
        private router: Router,
        private loader: NgxSpinnerService
    ) { }
    
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let requestHeader = req.clone({
            headers: req.headers.set('CouncilId', 'alpha'),
        });

        // Handle login and specific URLs
        if (
            req.url.includes('Login') ||
            req.url.includes('refreshToken') ||
            req.url.includes('config.json') ||
            req.url.includes('ForgotPassword') ||
            req.url.includes('ResetPassword')
        ) {
            return next.handle(requestHeader);
        }

        // Check for tokens in local storage
        const localStorageTokens = localStorage.getItem('tokens');
        if (!localStorageTokens) {
            // If no tokens, proceed without authorization header
            return next.handle(requestHeader);
        }

        // Parse the token and check for expiration
        let token = JSON.parse(localStorageTokens) as TokenModel;
        token.deviceType = 'web';
        const isTokenExpired = this.jwtHelper.isTokenExpired(token.token);

        if (!isTokenExpired) {
            // If token is valid, clone the request and set the Authorization header
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token.token)
            });
            return next.handle(req);
        } else {
            // Handle token refresh logic if the token is expired
            if (!this.authService.isApiCall) {
                this.authService.isApiCall = true;
                this.authService.userProfile.next(null);
                
                return this.authService.refreshToken(token).pipe(
                    take(1),
                    switchMap(newTokens => {
                        if (newTokens) {
                            // Update the tokens in local storage
                            const updatedToken: TokenModel = {
                                token: newTokens.token,
                                refreshToken: newTokens.refreshToken,
                                deviceType: 'web'
                            };
                            localStorage.setItem('tokens', JSON.stringify(updatedToken));
                            
                            const userInfo = this.jwtHelper.decodeToken(newTokens.token) as UserProfile;
                            this.authService.userProfile.next(userInfo);

                            // Clone request with the new token
                            const clonedRequest = requestHeader.clone({
                                headers: requestHeader.headers.set('Authorization', `Bearer ${newTokens.token}`)
                            });
                            
                            this.authService.isApiCall = false;
                            return next.handle(clonedRequest);
                        } else {
                            this.router.navigate(['/']);
                            return throwError(() => new Error('Token refresh failed'));
                        }
                    })
                );
            } else {
                // If a token refresh is already in progress, continue with the original request
                return next.handle(requestHeader);
            }
        }
    }
}
