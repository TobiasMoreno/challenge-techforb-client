import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../data-access/auth.service';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [
    MatIconModule,
    MatError,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  hidePassword = true;
  isLoading = false;

  authService = inject(AuthService);
  router = inject(Router);
  cookieService = inject(CookieService);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.createForm();
  } 
  
  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }


onSubmit(): void {
  if (this.loginForm.valid) {
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.cookieService.set('access_token', response.access_token, 1, '/', '', true, 'Strict');
        this.cookieService.set('refresh_token', response.refresh_token, 2, '/', '', true, 'Strict');
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido de nuevo',
          text: 'Has iniciado sesión correctamente',
          confirmButtonColor: '#3085d6'
        })

        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error(error);

        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Correo o contraseña incorrectos. Inténtalo de nuevo.',
          confirmButtonColor: '#d33'
        });

        this.isLoading = false;
      }
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Formulario inválido',
      text: 'Por favor, complete todos los campos correctamente antes de continuar.',
      confirmButtonColor: '#f39c12'
    });
  }
}

}
