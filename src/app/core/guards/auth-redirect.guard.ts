import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthRedirectGuard implements CanActivate {
  private cookieService = inject(CookieService);
  private router = inject(Router);

  canActivate(): boolean {
    const token = this.cookieService.get('access_token');

    if (token) {
      console.warn('Usuario ya autenticado, redirigiendo al dashboard...');
      this.router.navigate(['/dashboard']);
      return false; 
    }

    return true; 
  }
}
