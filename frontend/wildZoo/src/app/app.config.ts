  import { provideAnimations } from "@angular/platform-browser/animations";
  import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
  import { provideRouter } from '@angular/router';

  import { routes } from './app.routes';
  import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
  import { provideNativeDateAdapter } from '@angular/material/core';
  import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
  import { AuthInterceptor, LoadingInterceptor } from "../constants/interceptor";
  import { provideOAuthClient } from 'angular-oauth2-oidc';
  import { registerLocaleData } from '@angular/common';
  import localeEs from '@angular/common/locales/es';
  

  registerLocaleData(localeEs);
  export const appConfig: ApplicationConfig = {
    providers: [
      { provide: LOCALE_ID, useValue: 'es' },
      provideAnimations(),
      provideRouter(routes), 
      provideAnimationsAsync(),
      provideNativeDateAdapter(),
      provideHttpClient(withInterceptors([AuthInterceptor,LoadingInterceptor])),
      provideOAuthClient(),
    ]
    
    
  };
