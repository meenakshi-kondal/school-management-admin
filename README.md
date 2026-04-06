# School Management System

This project contains a complete School Management System frontend (Angular). 

## What We Created
We implemented essential features for managing a school environment:
1. **Frontend Integration**: 
   - An Angular-based UI for users to interact with.
   - An `ApiService` to handle HTTP requests securely.
   - An HTTP Interceptor to automatically attach JWT authorization tokens.
   - Dedicated components to handle forms, such as **Student Admission** and **Adding Teachers**.
   - A fully functional **Login Page** linked to the backend authentication API.

## How to Run

### 1. Running the Frontend 🌐

1. Navigate to the management directory:
   ```bash
   cd ../management
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Boot the Angular development server (runs on `http://localhost:4200` by default):
   ```bash
   npm run start
   # or
   ng serve
   ```

## Administrator Information 🔐

When the backend spins up and successfully connects to your MongoDB database, it executes an auto-seeder to guarantee an admin profile is available to use immediately.

If there is no admin registered in the system, you can log in to the frontend application using the newly created default credentials:

**Email:** `admin@test.com`  
**Password:** `Admin@11`  
**Role:** `admin`

Simply use these credentials on the login page to gain access to the dashboard. Once authenticated, the system will provide an authorization token to perform other tasks (like admitting students or saving new teacher profiles).
