import { Routes } from '@angular/router';
import { SideNavComponent } from './shared/ui/layout/side-nav/side-nav.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthRedirectGuard } from './core/guards/authRedirect.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthRedirectGuard],
    loadComponent: () =>
      import('./auth/features/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    canActivate: [AuthRedirectGuard],
    loadComponent: () =>
      import('./auth/features/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: '',
    component: SideNavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
