import { Injectable, computed, signal } from '@angular/core';

export interface Asset {
  id: number;
  name: string;
  location: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  category: string;
}

export interface WorkOrder {
  id: number;
  title: string;
  description: string;
  assignee: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'PENDING' | 'IN_PROGRESS' | 'CLOSED';
  dueDate: string;
}

export interface DashboardStats {
  totalAssets: number;
  activeAssets: number;
  inactiveAssets: number;
  maintenanceAssets: number;
  totalWorkOrders: number;
  openWorkOrders: number;
  pendingWorkOrders: number;
  overdueWorkOrders: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private refreshTrigger = signal(0);

  constructor() {
    // Listen for data updates from other MFEs
    window.addEventListener('badge-update', () => {
      this.refresh();
    });
  }

  stats = computed<DashboardStats>(() => {
    this.refreshTrigger(); // Track for reactivity
    
    const assets = this.getAssets();
    const workOrders = this.getWorkOrders();
    const today = new Date();

    return {
      totalAssets: assets.length,
      activeAssets: assets.filter(a => a.status === 'ACTIVE').length,
      inactiveAssets: assets.filter(a => a.status === 'INACTIVE').length,
      maintenanceAssets: assets.filter(a => a.status === 'MAINTENANCE').length,
      totalWorkOrders: workOrders.length,
      openWorkOrders: workOrders.filter(wo => wo.status === 'OPEN').length,
      pendingWorkOrders: workOrders.filter(wo => wo.status === 'PENDING').length,
      overdueWorkOrders: workOrders.filter(wo => {
        const dueDate = new Date(wo.dueDate);
        return dueDate < today && (wo.status === 'OPEN' || wo.status === 'PENDING');
      }).length
    };
  });

  private getAssets(): Asset[] {
    return JSON.parse(sessionStorage.getItem('assets') || '[]');
  }

  private getWorkOrders(): WorkOrder[] {
    return JSON.parse(sessionStorage.getItem('workOrders') || '[]');
  }

  refresh(): void {
    this.refreshTrigger.update(v => v + 1);
  }
}
