import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { AuthResponse, RegisterRequest } from '../../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  login(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.API_URL + '/auth/login', data);
  }
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.API_URL + '/auth/register', data);
  }
  refreshToken(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.API_URL + '/auth/login', data);
  }
}
