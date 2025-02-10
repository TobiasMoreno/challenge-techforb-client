import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    LoginComponent,
    RegisterComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  isLoginForm = true;
  router = inject(Router);

  toggleForm() {
    this.isLoginForm = !this.isLoginForm;
  }

  onRegisterSuccess(isLogin: boolean) {
    this.isLoginForm = isLogin;
  }
}
