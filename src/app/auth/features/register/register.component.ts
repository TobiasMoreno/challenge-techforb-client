import {
  Component,
  EventEmitter,
  inject,
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
import { Router } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
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
        .subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Bienvenido',
              text: 'Te has registrado correctamente',
              confirmButtonColor: '#3085d6',
            });
            this.registerSuccess.emit(true);
            this.isLoading = false;
          },
          error: (error: any) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al registrar',
              text: 'No se pudo completar el registro. Inténtalo nuevamente.',
              confirmButtonColor: '#d33',
            });

            this.isLoading = false;
          },
        });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, complete todos los campos correctamente antes de continuar.',
        confirmButtonColor: '#f39c12',
      });
    }
  }
  checkPasswords(): boolean {
    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error de contraseña',
        text: 'Las contrasenas no coinciden. Inténtalo de nuevo.',
        confirmButtonColor: '#d33',
      })
      return false;
    }
    return true;
  }
}
