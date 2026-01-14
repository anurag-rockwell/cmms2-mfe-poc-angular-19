import { Routes } from '@angular/router';
import { WORKORDERS_ROUTES } from './workorders.routes';

// When running standalone, use the workorders routes
// When running in shell, the shell imports these routes via path aliases
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'workorders',
    pathMatch: 'full'
  },
  {
    path: 'workorders',
    children: WORKORDERS_ROUTES
  }
];
