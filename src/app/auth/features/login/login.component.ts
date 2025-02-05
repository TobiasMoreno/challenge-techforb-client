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
import { AuthService } from '../../data-access/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  hidePassword = true;
  isLoading = false;

  authService = inject(AuthService);
  router = inject(Router);
  cookieService = inject(CookieService);
  _snackBar = inject(MatSnackBar);
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
      this.authService
        .login(this.loginForm.value)
        .subscribe((response: any) => {
          this.cookieService.set('access_token', response.access_token, 1, '/', '', true, 'Strict');
          this._snackBar.open('¡Inicio de sesión exitoso!', 'Cerrar', { duration: 3000, panelClass: ['success-snackbar'] });
          this.router.navigate(['/dashboard']);
        }),
        (error: any) => {
          console.log(error);
          this._snackBar.open('Error al iniciar sesión', 'Cerrar', { duration: 3000, panelClass: ['error-snackbar'] }); 
        };
        this.isLoading = false;
    }
  }
}
