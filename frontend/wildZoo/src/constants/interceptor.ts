import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../service/loading/loading.service';
import { finalize } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = null;

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq);
}

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show();
  
  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};


