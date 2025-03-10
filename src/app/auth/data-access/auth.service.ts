import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { AuthResponse, RegisterRequest } from '../../models/auth.model';
import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  cookieService = inject(CookieService);
  router = inject(Router);
  login(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.API_URL + '/auth/login', data);
  }
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.API_URL + '/auth/register', data);
  }
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.cookieService.get('refresh_token');

    if (!refreshToken) {
      return throwError(() => new Error('No hay refresh token disponible.')); 
    }

    return this.http.post<AuthResponse>(
      this.API_URL + '/auth/refresh-token',
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    ).pipe(
      switchMap((response) => {
        this.cookieService.set('access_token', response.access_token, 1, '/', '', true, 'Strict');
        this.cookieService.set('refresh_token', response.refresh_token, 2, '/', '', true, 'Strict');
        return of(response);
      }),
      catchError((error) => {
        this.cookieService.delete('access_token');
        this.cookieService.delete('refresh_token');
        return throwError(() => error);
      })
    );
  }

  logOut(): void {
    this.cookieService.deleteAll();
    this.router.navigate(['/auth']);
  }

}
