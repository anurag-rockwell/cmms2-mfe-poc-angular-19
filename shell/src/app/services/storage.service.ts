import { Injectable } from '@angular/core';

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

@Injectable({ providedIn: 'root' })
export class StorageService {
  getAssets(): Asset[] {
    return JSON.parse(sessionStorage.getItem('assets') || '[]');
  }

  setAssets(assets: Asset[]): void {
    sessionStorage.setItem('assets', JSON.stringify(assets));
  }

  getWorkOrders(): WorkOrder[] {
    return JSON.parse(sessionStorage.getItem('workOrders') || '[]');
  }

  setWorkOrders(workOrders: WorkOrder[]): void {
    sessionStorage.setItem('workOrders', JSON.stringify(workOrders));
  }
}
