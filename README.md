# ✅ **IMPORTANT NOTES**
## 🔹 **CORS Issue?**
**If you encounter CORS errors, try opening the frontend in Incognito Mode in your browser.**

## NOW START 


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




# Folder Structure Backend for .env 

backend/
├── auth-service/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   │   ├── leaveApplication.controller.js
│   │   │   ├── leaves.controller.js
│   │   │   ├── login.controller.js
│   │   │   ├── logout.controller.js
│   │   │   └── user.controller.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── isAdminMiddleware.js
│   │   ├── models/
│   │   ├── routes/
│   │   │   ├── leaveApplication.routes.js
│   │   │   ├── leaves.routes.js
│   │   │   ├── login.routes.js
│   │   │   ├── logout.routes.js
│   │   │   └── user.routes.js
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   └── validations/
│   │       └── auth.validation.js
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│
├── registration-service/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── validations/
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
│





# ✅ **IMPORTANT NOTES**

## 🔹 **MongoDB must be running before starting the backend services.**

## 🔹 **Both services use the same database (`authDb`) for user consistency.**

## 🔹 **JWT (JSON Web Tokens) are used for secure authentication.**

## 🔹 **Email handling:**
- **Stored in lowercase and trimmed.**
- **Uniqueness is enforced to prevent duplicate accounts.**

## 🔹 **CORS Issue?**
**If you encounter CORS errors, try opening the frontend in Incognito Mode in your browser.**
