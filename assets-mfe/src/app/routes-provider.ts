import { Routes } from '@angular/router';

/**
 * Route Provider for Assets MFE
 * This function is called by the shell to get lazy-loaded routes
 * The shell doesn't need to know about our component structure
 */
export function getRoutes(): Routes {
  return [
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
}
