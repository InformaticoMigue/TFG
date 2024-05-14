  import { provideAnimations } from "@angular/platform-browser/animations";
  import { ApplicationConfig, importProvidersFrom } from '@angular/core';
  import { provideRouter } from '@angular/router';

  import { routes } from './app.routes';
  import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
  import { provideNativeDateAdapter } from '@angular/material/core';
  import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
  import { provideOAuthClient } from 'angular-oauth2-oidc';
  import { AuthInterceptor } from "../components/interceptors/auth-interceptor/auth-interceptor.component";

  export const appConfig: ApplicationConfig = {
    providers: [
          provideAnimations(),
          provideRouter(routes), 
      provideAnimationsAsync(),
      provideNativeDateAdapter(),
      provideHttpClient(withInterceptors([AuthInterceptor])),
      provideOAuthClient()
      
    ]
    
  };
