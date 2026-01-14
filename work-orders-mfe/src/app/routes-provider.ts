import { Routes } from '@angular/router';

/**
 * Route Provider for Work Orders MFE
 * This function is called by the shell to get lazy-loaded routes
 * The shell doesn't need to know about our component structure
 */
export function getRoutes(): Routes {
  return [
    {
      path: 'all',
      loadComponent: () => import('./components/work-order-list/work-order-list.component').then(m => m.WorkOrderListComponent),
      title: 'All Work Orders'
    },
    {
      path: 'add',
      loadComponent: () => import('./components/work-order-form/work-order-form.component').then(m => m.WorkOrderFormComponent),
      title: 'Add Work Order'
    },
    {
      path: '',
      redirectTo: 'all',
      pathMatch: 'full'
    }
  ];
}
