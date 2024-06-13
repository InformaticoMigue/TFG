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
import { MatPaginatorIntl } from "@angular/material/paginator";
  

  registerLocaleData(localeEs);
  export function getSpanishPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();
    
    paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
    paginatorIntl.nextPageLabel = 'Siguiente página';
    paginatorIntl.previousPageLabel = 'Página anterior';
    paginatorIntl.firstPageLabel = 'Primera página';
    paginatorIntl.lastPageLabel = 'Última página';
    paginatorIntl.getRangeLabel = (page, pageSize, length) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return `${startIndex + 1} – ${endIndex} de ${length}`;
    };
  
    return paginatorIntl;
  }
  
  export const appConfig: ApplicationConfig = {
    providers: [
      { provide: LOCALE_ID, useValue: 'es' },
      { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
      provideAnimations(),
      provideRouter(routes), 
      provideAnimationsAsync(),
      provideNativeDateAdapter(),
      provideHttpClient(withInterceptors([AuthInterceptor,LoadingInterceptor])),
      provideOAuthClient(),
    ]
    
    
  };
