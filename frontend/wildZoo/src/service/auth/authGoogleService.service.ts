import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleServiceService {
  private oauthService = inject(OAuthService)
  private router = inject(Router)

  constructor() { 
    this.initConfiguration();
  }

  private initConfiguration() {
    const authConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '602112610377-7hpb65vq4vt2q930ogmkdgdok54o7iie.apps.googleusercontent.com',
      redirectUri: window.location.origin,
      scope: 'openid profile email'
    }
    this.oauthService.configure(authConfig),
    this.oauthService.setupAutomaticSilentRefresh(),
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logout() {
    this.oauthService.revokeTokenAndLogout();
    this.oauthService.logOut();	
  }

  public getProfile() {
    return this.oauthService.getIdentityClaims();
  }

  getToken() {
    return this.oauthService.getAccessToken();
  }

}
