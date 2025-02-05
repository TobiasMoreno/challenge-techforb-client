# Challenge Techforb 2025 - Frontend

This is the **frontend** for the **Challenge Techforb 2025**, built with **Angular 19**.  
The application allows users to authenticate, manage sensors, view real-time readings, and receive alerts for their industrial plants.  
It communicates with a **Spring Boot backend** that handles business logic and a **PostgreSQL database (Docker)**.

## Key Features

- **Responsive Design**: Optimized UI for desktops and mobile devices.
- **JWT Authentication**: Secure login and registration with role-based access (`USER`, `ADMIN`).

- **Real-Time Readings**: Dashboard with dynamic charts.
- **Security Alerts**: Notifications for critical alerts (`ALERTA_MEDIA`, `ALERTA_ROJA`).
- **Role-Based Access**: Controlled access for different user roles.
- **Angular Material & Bootstrap**: Modern and accessible design.

## Technologies Used

- **Angular 19**: Modern frontend framework.
- **TypeScript**: Strongly typed language for scalability.
- **RxJS**: Reactive programming for state management.
- **Angular Material & Bootstrap**: UI components and responsive design.
- **ngx-toastr**: Toast notifications.
- **Chart.js**: Interactive charts for real-time data visualization.

## Directory Structure

```bash
public
├── assets/
│   └── img/
│
src/
├── app/
│   ├── auth/             # Authentication (login, register, guards, interceptors)
│   ├── core/
│   ├── dashboard/
│   ├── models/           # Interfaces models
│   ├── shared/
│   ├── app.component.ts
│   ├── app.routes.ts
│
├── environments/
│   ├── environment.ts
│   ├── environment.prod.ts
│
└── styles.css
```

## Installation and Usage

To clone and run the frontend locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/TobiasMoreno/challenge-techforb-client.git
   ```

2. Navigate to the frontend directory:

   ```bash
   cd challenge-techforb-client
   ```

3. Install dependencies:

   ```bash
   npm install
   npm install @angular/material
   npm install ngx-cookie-service
   ```

4. Configure the environment
   Create the src/environments/environment.ts file with the following configuration:

   ```typescript
   export const environment = {
     production: false,
     apiUrl: "http://localhost:8080/api",
   };
   ```

5. Run the app:

   ```bash
   ng serve
   ```

6. Open your browser and visit: http://localhost:4200/
