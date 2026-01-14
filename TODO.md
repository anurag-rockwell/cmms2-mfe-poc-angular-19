# TODO: Tenant Management Microfrontend

## Overview
Create a new microfrontend `tenant-mgmt-mfe` following the same pattern as `assets-mfe` and `work-orders-mfe` for managing tenants with full CRUD operations.

## Required Functionality

### Tenant Management MFE (tenant-mgmt-mfe)
- [ ] Set up new microfrontend with same structure as assets-mfe and work-orders-mfe
- [ ] Implement tenant CRUD operations (Create, Read, Update, Delete)
- [ ] Add tenant status tracking (e.g., Active, Inactive, Pending, Suspended)
- [ ] Display tenant list with ability to view, edit, and delete tenants
- [ ] Provide form for adding and editing tenant information
- [ ] Include form validation for tenant data
- [ ] Store and manage tenant data similar to how assets and work orders are handled

### Shell Integration
- [ ] Register tenant-mgmt-mfe in the shell application
- [ ] Add tenant management navigation menu item to sidebar
- [ ] Enable module federation loading for tenant-mgmt-mfe
- [ ] Update startup script to include tenant-mgmt-mfe

### Dashboard Integration
- [ ] Display tenant statistics on dashboard
- [ ] Show total number of tenants
- [ ] Display tenant breakdown by current status (Active, Inactive, Pending, etc.)
- [ ] Show recently added or updated tenants
- [ ] Visualize tenant status distribution
- [ ] Update dashboard dynamically when tenant status changes

### Data & Business Logic
- [ ] Define tenant data model with relevant fields (name, contact info, status, etc.)
- [ ] Implement tenant service for data operations
- [ ] Handle tenant status transitions
- [ ] Ensure data consistency across MFEs