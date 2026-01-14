import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetService, Asset } from '../../services/asset.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent {
  private assetService = inject(AssetService);
  
  assets = this.assetService.assets;
  editingAsset = signal<Asset | null>(null);
  showEditModal = signal(false);

  edit(asset: Asset): void {
    this.editingAsset.set({...asset});
    this.showEditModal.set(true);
  }

  delete(id: number): void {
    if (confirm('Delete this asset?')) {
      this.assetService.delete(id);
    }
  }

  closeModal(): void {
    this.showEditModal.set(false);
  }

  saveEdit(): void {
    const asset = this.editingAsset();
    if (asset) {
      this.assetService.update(asset);
      this.closeModal();
    }
  }
}
