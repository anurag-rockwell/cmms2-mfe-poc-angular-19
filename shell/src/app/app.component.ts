import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule],
  template: `
    <div class="app-container" [class.sidebar-collapsed]="sidebarCollapsed">
      <app-header (toggleSidebar)="toggleSidebar()"></app-header>
      <div class="main-layout">
        <app-sidebar [collapsed]="sidebarCollapsed"></app-sidebar>
        <main class="content-area">
          <router-outlet></router-outlet>
        </main>
      </div>
      <footer class="app-footer">
        <div class="footer-content">
          <p>&copy; 2026 CMMS 2.0 - Computerized Maintenance Management System</p>
          <p class="footer-tech">Built with Angular 19 • Micro Frontend Architecture</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      height: 100vh;
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .main-layout {
      display: flex;
      flex: 1;
      overflow: hidden;
      position: relative;
    }

    .content-area {
      flex: 1;
      padding: 30px;
      background: #f5f7fa;
      overflow-y: auto;
      overflow-x: hidden;
      transition: margin-left 0.3s ease;
    }

    .app-footer {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 20px 30px;
      text-align: center;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
      flex-shrink: 0;
      z-index: 10;
    }

    .footer-content p {
      margin: 5px 0;
      font-size: 13px;
    }

    .footer-tech {
      color: #95a5a6;
      font-size: 12px;
    }
  `]
})
export class AppComponent {
  title = 'CMMS 2.0 - Angular 19';
  sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
