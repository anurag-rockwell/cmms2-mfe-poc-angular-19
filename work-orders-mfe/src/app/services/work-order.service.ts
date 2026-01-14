import { Injectable, signal } from '@angular/core';

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
export class WorkOrderService {
  private workOrdersSignal = signal<WorkOrder[]>(
    JSON.parse(sessionStorage.getItem('workOrders') || '[]')
  );

  readonly workOrders = this.workOrdersSignal.asReadonly();

  add(workOrder: Omit<WorkOrder, 'id'>): void {
    const newWorkOrder: WorkOrder = {
      ...workOrder,
      id: Date.now()
    };
    this.workOrdersSignal.update(orders => [...orders, newWorkOrder]);
    this.persist();
    window.dispatchEvent(new CustomEvent('badge-update'));
  }

  update(workOrder: WorkOrder): void {
    this.workOrdersSignal.update(orders =>
      orders.map(wo => wo.id === workOrder.id ? workOrder : wo)
    );
    this.persist();
    window.dispatchEvent(new CustomEvent('badge-update'));
  }

  delete(id: number): void {
    this.workOrdersSignal.update(orders => orders.filter(wo => wo.id !== id));
    this.persist();
    window.dispatchEvent(new CustomEvent('badge-update'));
  }

  private persist(): void {
    sessionStorage.setItem('workOrders', JSON.stringify(this.workOrders()));
  }
}
