import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AssetService } from '../../services/asset.service';

@Component({
  selector: 'app-asset-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.css']
})
export class AssetFormComponent {
  private assetService = inject(AssetService);
  private router = inject(Router);

  asset = {
    name: '',
    location: '',
    status: 'ACTIVE' as const,
    category: ''
  };

  submit(): void {
    this.assetService.add(this.asset);
    alert('Asset created successfully!');
    this.asset = { name: '', location: '', status: 'ACTIVE', category: '' };
  }
}
