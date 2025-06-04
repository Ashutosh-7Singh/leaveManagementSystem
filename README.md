✅ Method 1: Using "Copy Code" Button (Recommended)
Hover your mouse over the code block below.

Click the "Copy" icon (📋) that appears in the top-right corner of the block.

Paste it into your README.md file using any text editor or IDE (e.g., VS Code).

markdown
Copy
Edit
# Leave Management System

This project is a simple Leave Management System with two backend microservices and a frontend built using React. It supports user registration, login, and leave tracking functionality.

---

## 📁 Project Structure

leaveManagementSystem/
├── auth-service/ # Handles user login & authentication
├── registration-service/ # Handles user registration
├── frontend/ # React-based frontend (inside registration-service folder)

yaml
Copy
Edit

---

## 🛠️ Prerequisites

- Node.js (v16+)
- MongoDB (running locally on default port)
- npm or yarn

---

## 🚀 Getting Started

### Step 1: Setup `auth-service` (Login Service)

1. Open a terminal in the `auth-service` directory.
2. Create a `.env` file in the root of the folder and paste the following:

   ```env
   PORT=5003
   MONGO_URI=mongodb://localhost:27017/authDb
   JWT_SECRET=yourSuperSecretKey12345
Install dependencies and start the server:

bash
Copy
Edit
npm install
npm run dev
Step 2: Setup registration-service (Register Service)
Open a new terminal in the registration-service directory.

Create a .env file in the root of the folder and paste the following:

env
Copy
Edit
PORT=5004
MONGO_URI=mongodb://localhost:27017/authDb
Install dependencies and start the server:

bash
Copy
Edit
npm install
npm run dev
Step 3: Setup Frontend (React App)
📍 The frontend code is located inside the registration-service folder.

Open another terminal in the same registration-service directory.

Install frontend dependencies and run the development server:

bash
Copy
Edit
npm install
npm run dev
🖥️ Frontend will typically run on: http://localhost:5173
🔐 Auth Service API runs on: http://localhost:5003
📝 Registration API runs on: http://localhost:5004

✅ Features
User registration (with unique email validation)

User login with JWT authentication

MongoDB for persistent storage

Clean folder structure and .env configuration

React frontend integrated with backend APIs

