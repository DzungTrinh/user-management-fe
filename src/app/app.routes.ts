import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/login/login.routes').then((m) => m.default),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/auth/register/register.routes').then((m) => m.default),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
