import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth/data-access/auth-service.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const accessToken = cookieService.get('access_token');
  const refreshToken = cookieService.get('refresh_token');

  const excludedUrls = ['/api/auth'];

  if (excludedUrls.some((url) => req.url.includes(url))) {
    return next(req);
  }

  if (!accessToken) {
    console.warn('Token no encontrado, redirigiendo al login...');
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

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return next(authReq).pipe(
    catchError((error) => {
      debugger;
      if (error.status === 401 || error.status === 403) {
        return authService.refreshToken().pipe(
          switchMap((newTokens : any) => {
            if (!newTokens || !newTokens.access_token) {
              return throwError(() => new Error('Refresh token inválido'));
            }

            cookieService.set('access_token', newTokens.access_token);
            cookieService.set('refresh_token', newTokens.refresh_token);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newTokens.access_token}`,
              },
            });

            return next(retryReq);
          }),
          catchError(() => {
            router.navigate(['/auth']);
            return throwError(() => new Error('Error al refrescar el token'));
          })
        );
      }

      return throwError(() => error);
    })
  );
};
