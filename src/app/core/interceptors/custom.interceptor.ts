import { isPlatformServer } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../auth/data-access/auth.service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const accessToken = cookieService.get('access_token');
  const refreshToken = cookieService.get('refresh_token');

  const excludedUrls = ['/api/auth'];

  let headers = req.headers.set('Content-Type', 'application/json');

  if (isPlatformServer(platformId)) return next(req);

  if (excludedUrls.some((url) => req.url.includes(url))) {
    return next(req);
  }

  if (!accessToken) {
    router.navigate(['/auth']);
    return next(req);
  }

  if (req.url.includes('/auth/refresh-token')) {
    return next(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
    );
  }

  const authReq = req.clone({ headers });
  //Usuario pide algo con el token
  //Server responde 403 por token expirado
  //Interceptor captura el 403
  //Interceptor pide un nuevo token
  //Server responde con un nuevo token
  //Interceptor guarda el nuevo token
  //Interceptor reenvia la peticion original con el nuevo token
  //Si es otro error devuelve el error
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        return authService.refreshToken().pipe(
          switchMap((response) => {
            cookieService.set('access_token', response.access_token);
            cookieService.set('refresh_token', response.refresh_token);

            const updateHeaders = req.headers.set(
              'Authorization',
              `Bearer ${response.access_token}`
            );
            const newReq = req.clone({ headers: updateHeaders });

            return next(newReq);
          })
        );
      } else {
        return throwError(() => error);
      }
    })
  );
};
