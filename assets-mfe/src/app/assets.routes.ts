import { Routes } from '@angular/router';

export const ASSETS_ROUTES: Routes = [
  {
    path: 'all',
    loadComponent: () => import('./components/asset-list/asset-list.component').then(m => m.AssetListComponent),
    title: 'All Assets'
  },
  {
    path: 'add',
    loadComponent: () => import('./components/asset-form/asset-form.component').then(m => m.AssetFormComponent),
    title: 'Add Asset'
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  }
];
