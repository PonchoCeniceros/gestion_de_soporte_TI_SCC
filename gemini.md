# Project Context: Gestion de Tickets SCC

This project is a MERN (MongoDB, Express.js, React, Node.js) stack application designed for managing support tickets. It provides functionalities for creating, tracking, and assigning tickets, as well as managing clients and services.

## Key Features:
- User authentication and authorization (login).
- Ticket management: create, view, update status, assign to users.
- Client management.
- Service management.
- Responsive UI with Tailwind CSS.
- Separate API (backend) and App (frontend) modules.

## Technologies Used:

### Backend (mern/project/api):
- **Node.js/Express.js**: For building the RESTful API.
- **MongoDB/Mongoose**: Database and ODM for data persistence.
- **TypeScript**: For type-safe JavaScript.
- **JWT**: For authentication.
- **Winston**: For logging.

### Frontend (mern/project/app):
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: For type-safe JavaScript.
- **React Router DOM**: For navigation.
- **Tailwind CSS**: For styling.
- **Vite**: Build tool.

## Project Structure:

The project is organized into two main parts: `api` (backend) and `app` (frontend), located under `mern/project/`.

- `mern/project/api`: Contains the Express.js server, Mongoose models, controllers, and routes.
- `mern/project/app`: Contains the React application, components, pages, and services for interacting with the API.

## Recent Changes:
- Added client name, phone, and email fields to tickets.
- Implemented a modal for viewing ticket details.
- Adjusted form layout for better usability.
- Created a public ticket creation page (`/creando-ticket`) accessible without login or sidebar.
