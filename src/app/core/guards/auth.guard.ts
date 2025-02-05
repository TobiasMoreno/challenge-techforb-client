import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  router = inject(Router);
  cookieService = inject(CookieService);

  canActivate(): boolean {
    const token = this.cookieService.get('access_token');
    if (token) {
      return true; 
    }
    this.router.navigate(['/login']);
    return false;
  }
}
