import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data-access/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;
  @Output() registerSuccess = new EventEmitter<boolean>();

  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      if (!this.checkPasswords()) return;
      this.isLoading = true;
      this.authService
        .register({
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
        })
        .subscribe(() => {
          this.snackBar.open(
            'Se registró exitosamente el usario! Ahora se debe loguear',
            'Cerrar',
            { duration: 3000, panelClass: ['success-snackbar'] }
          );
          this.registerSuccess.emit(true);
        }),
        (error: any) => {
          console.log(error);
          this.snackBar.open('Error al registrar el usuario', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        };
      this.isLoading = false;
    }
  }
  checkPasswords(): boolean {
    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
      return false;
    }
    return true;
  }
}