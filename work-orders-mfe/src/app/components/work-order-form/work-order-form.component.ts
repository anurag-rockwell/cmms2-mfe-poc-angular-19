import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkOrderService } from '../../services/work-order.service';

@Component({
  selector: 'app-work-order-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './work-order-form.component.html',
  styleUrls: ['./work-order-form.component.css']
})
export class WorkOrderFormComponent {
  private workOrderService = inject(WorkOrderService);

  workOrder = {
    title: '',
    description: '',
    assignee: '',
    priority: 'MEDIUM' as const,
    status: 'OPEN' as const,
    dueDate: new Date().toISOString().split('T')[0]
  };

  submit(): void {
    this.workOrderService.add(this.workOrder);
    alert('Work order created successfully!');
    this.workOrder = { 
      title: '', 
      description: '', 
      assignee: '', 
      priority: 'MEDIUM', 
      status: 'OPEN',
      dueDate: new Date().toISOString().split('T')[0]
    };
  }
}
