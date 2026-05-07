# eMOTE

A self-help web application designed to support people dealing with binge eating and emotional regulation challenges.

This project was developed as a freelance collaboration with FPCEUP (Faculty of Psychology and Education Sciences of the University of Porto) while I was completing my MSc dissertation. The application provides structured self-help modules, user progress tracking, data visualization and notification-based engagement features.

## Features

- Self-help module system for guided user progression
- User access and role-based application flow
- Data visualization using Chart.js
- Responsive React frontend using Material UI
- REST API backend built with ASP.NET Core
- Input validation with FluentValidation
- API documentation with Swagger/OpenAPI
- Background services for scheduled tasks and notifications
- Web Push notification support
- Health check endpoint for deployment monitoring

## Tech Stack

### Frontend

- React
- Material UI
- Chart.js

### Backend

- ASP.NET Core Web API
- C#
- .NET 7
- Entity Framework Core
- SQLite
- FluentValidation
- Swagger / OpenAPI
- WebPush

### Infrastructure & Tooling

- Docker
- CORS configuration
- Health checks
- Prometheus monitoring packages
- Google Drive API integration
- Netlify deployment for frontend

## Architecture

The application is structured as a frontend/backend web application.

The frontend is built with React and Material UI, providing the user interface for the self-help modules, progress tracking and data visualization.

The backend is an ASP.NET Core Web API responsible for business logic, user access, module content, notifications and persistence. Entity Framework Core is used for database access, while Swagger/OpenAPI provides API documentation during development.

The backend also includes hosted services for periodic background tasks, such as notification handling and application state updates.

## Backend Highlights

- RESTful API built with ASP.NET Core controllers
- Entity Framework Core database context
- SQLite persistence
- FluentValidation-based request validation
- Swagger/OpenAPI documentation
- Hosted background services
- CORS configuration for frontend/backend communication
- Web Push notification support

## Motivation

This project gave me practical experience building a real-world health-related web application with both frontend and backend responsibilities.

It involved working with:

- client requirements
- production-facing frontend development
- backend API design
- database modelling
- validation
- scheduled background services
- data visualization
- deployment constraints

## Local Development

### Frontend

Install dependencies:

```bash
npm install
```

Run the frontend development server:

```bash
npm run dev
```

### Backend

Run the ASP.NET Core backend:

```bash
dotnet run
```

Swagger documentation is available in development mode.
