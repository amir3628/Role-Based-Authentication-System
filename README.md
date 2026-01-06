## 🔐 Role-Based Authentication System – Frontend
- A modern React.js frontend for a secure authentication system supporting role-based access, single active session login, login override confirmation, and seamless integration with a Node.js backend.

## 🎯 Purpose
- This frontend application provides a clean and user-friendly interface for:
- Secure user login
- Handling single-session restrictions
- Allowing users to override active sessions
- Rendering UI based on user roles

## ✨ Features
- Login & logout functionality
- Single active session detection
- Login override confirmation modal
- Role-based UI rendering (Admin / User)
- Protected routes
- Centralized error handling
- Responsive and clean UI

## 🛠 Tech Stack
- React.js
- React Router
- Axios
- Context API / Redux
- JWT-based authentication
- Tailwind CSS 

## 🏗 Application Flow
 User → Login Page
     → API Call
     → Active Session Check
        → Allow Login
        → OR Show Override Modal

⚙️ Setup & Installation
- Prerequisites
- Node.js (v18+)

## Backend API running

- Installation
- git clone <frontend-repo-url>
- cd frontend
- npm install
- npm start

## 🔐 Environment Variables
- Create a .env file:
- REACT_APP_API_BASE_URL=http://localhost:5000/api


Session activity indicator

Admin session management UI
