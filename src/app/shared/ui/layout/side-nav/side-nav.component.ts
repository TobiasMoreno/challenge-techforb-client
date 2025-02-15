import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-nav',
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  router = inject(Router);
  cookieService = inject(CookieService);
  logout(): void {
    Swal.fire({
      icon: 'question',
      title: 'Cerrar Sesión',
      text: 'Estas seguro de cerrar sesión?',
      showCancelButton: true,
      confirmButtonText: 'Cerrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cookieService.delete('access_token');
        this.cookieService.delete('refresh_token');
        this.router.navigate(['/auth']);
      }
    })
  }
}
