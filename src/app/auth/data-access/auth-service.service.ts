import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { AuthResponse, RegisterRequest } from '../../models/auth.model';
import { Observable, of, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  cookieService = inject(CookieService);
  login(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.API_URL + '/auth/login', data);
  }
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.API_URL + '/auth/register', data);
  }
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.cookieService.get('refresh_token');

    if (!refreshToken) {
      console.error('No hay refresh token disponible.');
      return new Observable<AuthResponse>(); // Si no hay refresh token, retornar un observable vacío.
    }

    return this.http.post<AuthResponse>(
      this.API_URL + '/auth/refresh-token',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
  }
}
