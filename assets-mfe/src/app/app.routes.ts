import { Routes } from '@angular/router';
import { ASSETS_ROUTES } from './assets.routes';

// When running standalone, use the assets routes
// When running in shell, the shell imports these routes via path aliases
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'assets',
    pathMatch: 'full'
  },
  {
    path: 'assets',
    children: ASSETS_ROUTES
  }
];
