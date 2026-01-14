import { Routes } from '@angular/router';

/**
 * FULLY DECOUPLED ROUTING ARCHITECTURE
 * 
 * The shell dynamically loads routes from each MFE's route-provider.
 * Each MFE exports a getRoutes() function that returns its routes.
 * 
 * Architecture:
 * 1. Shell loads mfe-registry.json (lists MFEs and URLs)
 * 2. For each MFE URL path (e.g., /assets), shell lazy-loads the MFE's routes
 * 3. MFE's routes-provider.ts exports getRoutes() with lazy component loading
 * 4. Shell has ZERO knowledge of MFE component paths or names
 * 
 * Benefits:
 * - Complete decoupling: Shell doesn't import any MFE code
 * - MFEs are autonomous: Define their own routes and components
 * - No tight coupling: MFEs can change without affecting shell
 * - True micro-frontend independence
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  // Dashboard MFE routes - dynamically loaded from the MFE
  {
    path: 'dashboard',
    loadChildren: () => import('@dashboard/routes-provider').then(m => m.getRoutes())
  },
  // Assets MFE routes - dynamically loaded from the MFE
  {
    path: 'assets',
    loadChildren: () => import('@assets/routes-provider').then(m => m.getRoutes())
  },
  // Work Orders MFE routes - dynamically loaded from the MFE
  {
    path: 'workorders',
    loadChildren: () => import('@work-orders/routes-provider').then(m => m.getRoutes())
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
