import { Routes } from '@angular/router';
import { SideNavComponent } from './shared/ui/layout/side-nav/side-nav.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthRedirectGuard } from './core/guards/authRedirect.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthRedirectGuard],
    loadComponent: () =>
      import('./auth/features/main/main.component').then(
        (m) => m.MainComponent
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
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];
