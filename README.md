## Vehicle Rental System

#### Github Link: https://github.com/MD-ABUSUFIAN/vehicle-Rental-System
#### Live Link: https://vehicle-rental-system-ivory.vercel.app/

## Project Overview
A backend API for a vehicle rental management system that handles:
* Vehicles - Manage vehicle inventory with availability tracking
* Customers - Manage customer accounts and profiles
* Bookings - Handle vehicle rentals, returns and cost calculation
* Authentication - Secure role-based access control (Admin and Customer roles)

## 🛠️ Technology Stack
* Node.js + TypeScript
* Express.js (web framework)
* PostgreSQL (database)
* bcrypt (password hashing)
* jsonwebtoken (JWT authentication)

## 🔐 Authentication & Authorization
#### User Roles
* Admin - Full system access to manage vehicles, users and all bookings
* Customer - Can register, view vehicles, create/manage own bookings
#### Authentication Flow
1. Passwords are hashed using bcrypt before storage into the database
2. User login via /api/v1/auth/signin and receives a JWT (JSON Web Token)
3. Protected endpoints require token in header: Authorization: Bearer <token>
4. Validates the token and checks user permissions
5. Access granted if authorized, otherwise returns 401 (Unauthorized) or 403 (Forbidden)
## 📁 Code Structure

#### All of code are Modular Pattern Follow