import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div style="text-align: center; padding: 60px 20px;">
      <h2 style="color: #2c3e50; margin-bottom: 20px;">Welcome to CMMS 2.0</h2>
      <p style="color: #7f8c8d; font-size: 16px;">Select an option from the left menu to get started</p>
    </div>
  `
})
export class HomeComponent {}
