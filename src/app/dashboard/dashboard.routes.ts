import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard').then(m => m.Dashboard),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./overview/overview').then(m => m.Overview),
      },
      {
        path: 'messages',
        loadComponent: () => import('./messages/messages').then(m => m.Messages),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then(m => m.Register),
  },
];
