import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MfeManifestService, MfeManifest } from '../../services/mfe-manifest.service';

/**
 * SIDEBAR COMPONENT - DISTRIBUTED MANIFEST ARCHITECTURE
 * 
 * Each MFE hosts its own manifest.json at its URL
 * Shell fetches manifests from each MFE and builds menu
 * 
 * Architecture:
 * 1. Shell reads mfe-registry.json (list of MFE URLs)
 * 2. Fetches manifest.json from each MFE URL
 * 3. Aggregates all routes
 * 4. Builds dynamic menu
 * 
 * Benefits:
 * - MFEs own their manifests
 * - MFE can update routes without touching shell
 * - True micro-frontend independence
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() collapsed = false;
  
  menus: any[] = [];

  constructor(private mfeManifestService: MfeManifestService) {}

  ngOnInit() {
    // Load menu items from MFE manifests
    this.mfeManifestService.getMfes().subscribe(manifests => {
      this.menus = this.buildMenuFromManifests(manifests);
      console.log('[Sidebar] Loaded menus from', manifests.length, 'MFEs:', this.menus);
    });
  }

  /**
   * Transform MFE manifests into sidebar menu structure
   */
  private buildMenuFromManifests(manifests: MfeManifest[]): any[] {
    return manifests.map(manifest => ({
      label: manifest.displayName,
      icon: manifest.icon,
      expanded: true,
      items: manifest.routes.map(route => ({
        label: route.label,
        icon: route.icon || '•',
        route: route.path,
        description: route.description
      }))
    }));
  }

  toggleMenu(menu: any) {
    if (!this.collapsed) {
      menu.expanded = !menu.expanded;
    }
  }
}
