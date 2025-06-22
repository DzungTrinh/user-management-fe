import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpHeaders,
} from '@angular/common/http';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const auth = inject(AuthService);
  const token = auth.token() || localStorage.getItem('accessToken');

  if (token) {
    req = req.clone({
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }
  return next(req);
};
