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

  const excludedUrls = ['/api/auth/login', '/api/auth/register'];

  // 🚨 Si la solicitud es de login o register, no hacer nada
  if (excludedUrls.some((url) => req.url.includes(url))) {
    return next(req);
  }

  // 🚨 Si no hay accessToken, no proceder
  if (!accessToken) {
    console.warn('Token no encontrado, redirigiendo al login...');
    router.navigate(['/login']);
    return next(req);
  }

  // 🚨 Si la solicitud es para el refresh token, usar el refreshToken
  if (req.url.includes('/auth/refresh-token')) {
    return next(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
    );
  }

  // 🚨 Clonar la solicitud agregando el access token
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Proceder con la solicitud interceptada
  return next(authReq).pipe(
    catchError((error) => {
      debugger;
      if (error.status === 401 || error.status === 403) {
        return authService.refreshToken().pipe(
          switchMap((newTokens : any) => {
            console.log({
              newTokens,
              if: {
                newTokens : !newTokens,
                newTokensAccessToken: !newTokens.access_token
              },
            });
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
            console.error(
              '❌ No se pudo refrescar el token, redirigiendo al login...'
            );
            router.navigate(['/auth']);
            return throwError(() => new Error('Error al refrescar el token'));
          })
        );
      }

      return throwError(() => error);
    })
  );
};
