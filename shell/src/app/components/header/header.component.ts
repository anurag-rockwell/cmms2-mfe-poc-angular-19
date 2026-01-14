import { Component, inject, Output, EventEmitter } from '@angular/core';
import { BadgeCounterService } from '../../services/badge-counter.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  badgeService = inject(BadgeCounterService);
  activeAssets = this.badgeService.activeAssetsCount;
  pendingWorkOrders = this.badgeService.pendingWorkOrdersCount;

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
