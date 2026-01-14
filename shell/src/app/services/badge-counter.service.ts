import { Injectable, signal, computed } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class BadgeCounterService {
  private updateTrigger = signal(0);

  constructor(private storage: StorageService) {
    // Listen for badge-update events from MFEs
    window.addEventListener('badge-update', () => {
      this.notifyUpdate();
    });
  }

  activeAssetsCount = computed(() => {
    this.updateTrigger(); // Track changes
    const assets = this.storage.getAssets();
    return assets.filter(a => a.status === 'ACTIVE').length;
  });

  pendingWorkOrdersCount = computed(() => {
    this.updateTrigger(); // Track changes
    const workOrders = this.storage.getWorkOrders();
    return workOrders.filter(wo => wo.status === 'OPEN' || wo.status === 'PENDING').length;
  });

  notifyUpdate(): void {
    this.updateTrigger.update(v => v + 1);
  }
}
