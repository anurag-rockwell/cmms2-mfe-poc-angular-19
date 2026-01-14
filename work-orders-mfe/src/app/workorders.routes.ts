import { Routes } from '@angular/router';

export const WORKORDERS_ROUTES: Routes = [
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
