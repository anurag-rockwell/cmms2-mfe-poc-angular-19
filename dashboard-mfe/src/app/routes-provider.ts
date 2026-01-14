import { Routes } from '@angular/router';

export function getRoutes(): Routes {
  return [
    {
      path: '',
      loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
    }
  ];
}
