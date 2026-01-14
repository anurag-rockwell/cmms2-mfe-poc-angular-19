import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderService, WorkOrder } from '../../services/work-order.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-work-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.css']
})
export class WorkOrderListComponent {
  private workOrderService = inject(WorkOrderService);
  
  workOrders = this.workOrderService.workOrders;
  editingWorkOrder = signal<WorkOrder | null>(null);
  showEditModal = signal(false);

  edit(wo: WorkOrder): void {
    this.editingWorkOrder.set({...wo});
    this.showEditModal.set(true);
  }

  delete(id: number): void {
    if (confirm('Delete this work order?')) {
      this.workOrderService.delete(id);
    }
  }

  closeModal(): void {
    this.showEditModal.set(false);
  }

  saveEdit(): void {
    const wo = this.editingWorkOrder();
    if (wo) {
      this.workOrderService.update(wo);
      this.closeModal();
    }
  }
}
