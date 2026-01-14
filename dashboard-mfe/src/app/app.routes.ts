import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  }
];
