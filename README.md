# Leave Management System – Microservices-Based Setup

This project is a **microservices-based Leave Management System** built using **Node.js**, **Express**, and **MongoDB**. It consists of two primary backend services and one frontend:

- `auth-service`: Handles user authentication (login).
- `registration-service`: Handles user registration.
- Frontend (React-based UI): Interfaces with both services.

---

## 🔧 Prerequisites

Ensure you have the following installed:

- Node.js (v16 or above recommended)
- MongoDB (running locally on `mongodb://localhost:27017`)
- npm (Node Package Manager)

---

## 📦 Backend Setup

There are two backend services: `auth-service` and `registration-service`.

---

### 1️⃣ Auth Service (Login)

**Step 1:** Open a terminal and navigate to the `auth-service` directory.

```bash
cd auth-service
Step 2: Create a .env file in the root of auth-service and add the following:

PORT=5003
MONGO_URI=mongodb://localhost:27017/authDb
JWT_SECRET=yourSuperSecretKey12345

Step 3: Install dependencies and start the development server.
npm install
npm run dev


2️⃣ Registration Service
Step 1: Open a new terminal and navigate to the registration-service directory.  or just open registration-service in terminal .

Step 2: Create a .env file in the root of registration-service and add the following:

PORT=5004
MONGO_URI=mongodb://localhost:27017/authDb

Step 3: Install dependencies and start the development server.

npm install
npm run dev

🖥️ Frontend Setup

Step 1: Open a terminal and navigate to the registration-service folder (React frontend resides here).

cd registration-service
Step 2: Install frontend dependencies and run the app.

npm install
npm run dev
✅ Notes

Ensure MongoDB is running locally before starting the backend services.
All services use the same MongoDB database: authDb.
The email field is stored in lowercase and trimmed, with uniqueness enforced.
JWT is used for authentication.


