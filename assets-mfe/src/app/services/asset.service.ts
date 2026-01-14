import { Injectable, signal } from '@angular/core';

export interface Asset {
  id: number;
  name: string;
  location: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  category: string;
}

@Injectable({ providedIn: 'root' })
export class AssetService {
  private assetsSignal = signal<Asset[]>(
    JSON.parse(sessionStorage.getItem('assets') || '[]')
  );

  readonly assets = this.assetsSignal.asReadonly();

  add(asset: Omit<Asset, 'id'>): void {
    const newAsset: Asset = {
      ...asset,
      id: Date.now()
    };
    this.assetsSignal.update(assets => [...assets, newAsset]);
    this.persist();
    window.dispatchEvent(new CustomEvent('badge-update'));
  }

  update(asset: Asset): void {
    this.assetsSignal.update(assets =>
      assets.map(a => a.id === asset.id ? asset : a)
    );
    this.persist();
    window.dispatchEvent(new CustomEvent('badge-update'));
  }

  delete(id: number): void {
    this.assetsSignal.update(assets => assets.filter(a => a.id !== id));
    this.persist();
    window.dispatchEvent(new CustomEvent('badge-update'));
  }

  private persist(): void {
    sessionStorage.setItem('assets', JSON.stringify(this.assets()));
  }
}
