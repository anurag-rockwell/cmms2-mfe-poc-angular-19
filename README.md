# CMMS Microfrontend POC - Angular 19

A proof-of-concept Computerized Maintenance Management System (CMMS) built with Angular 19 using Module Federation for microfrontend architecture.

## Architecture Overview

This project demonstrates a microfrontend architecture where independent applications are dynamically loaded into a shell application at runtime. Each microfrontend (MFE) can be developed, tested, and deployed independently while working together as a unified application.

### Core Components

**Shell Application**
- Host application that orchestrates all microfrontends
- Provides common layout (header, sidebar, navigation)
- Dynamically loads MFEs based on manifest configuration
- Manages routing between different microfrontends
- Runs on its own port with independent build process

**Microfrontends (MFEs)**
- **assets-mfe**: Manages asset inventory with CRUD operations
- **work-orders-mfe**: Handles work order creation and management
- **dashboard-mfe**: Displays analytics and summaries from all MFEs

Each MFE is a standalone Angular application that exposes specific routes and components through Module Federation.

## How It Works

### Module Federation
The project uses Webpack Module Federation to enable runtime integration. Each MFE exposes its routes through a federated module, allowing the shell to load them dynamically without bundling everything together.

### Manifest System
The shell uses two key configuration files:

**mfe-manifest.json**
- Defines available microfrontends and their metadata
- Specifies remote entry points and exposed modules
- Maps routes to specific MFEs

**mfe-mainfest-registry.json**
- Registers MFE endpoints and ports
- Provides runtime configuration for loading remotes

When a user navigates to a route, the shell:
1. Checks the manifest for the corresponding MFE
2. Loads the remote module if not already loaded
3. Renders the MFE's component in the router outlet

### Route Management
Each MFE exports its own routes through a `routes-provider.ts` file. The shell imports these routes dynamically, enabling lazy loading and independent deployment. Navigation between MFEs is seamless from the user's perspective.

## Project Structure

```
cmm2-mfe-poc-angular-19/
├── shell/              # Host application
├── assets-mfe/         # Asset management MFE
├── dashboard-mfe/      # Dashboard analytics MFE
├── work-orders-mfe/    # Work order management MFE
└── start-all.sh        # Script to start all applications
```

## Running the Application

Execute the startup script to launch all microfrontends and the shell:

```bash
./start-all.sh
```

This starts each MFE on its designated port and launches the shell application, which orchestrates the entire system.

## Key Benefits

- **Independent Development**: Teams can work on different MFEs without conflicts
- **Technology Flexibility**: Each MFE can use different versions or libraries
- **Scalable Deployment**: Deploy individual MFEs without rebuilding everything
- **Runtime Integration**: No compile-time dependencies between MFEs
- **Incremental Migration**: Add or update features without system-wide changes

## Technology Stack

- Angular 19
- TypeScript
- Webpack Module Federation
- Standalone Components
- Reactive Forms
