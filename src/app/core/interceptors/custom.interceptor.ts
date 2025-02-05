import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const token = cookieService.get('access_token');
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(req);
};
