import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('access_token');

  const excludedUrls = ['/api/auth/login', '/api/auth/register'];

  if (excludedUrls.some((url) => req.url.includes(url))) {
    return next(req);
  }

  if (!token) {
    console.warn('Token no encontrado, redirigiendo al login...');
    router.navigate(['/login']);
    return next(req); 
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};