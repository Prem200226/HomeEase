# HomeEase
🏡 HomeEase — Smart Home Service Booking Platform

HomeEase is a full-stack web application that allows users to book and manage home services (like cleaning, painting, electrical work, plumbing, gardening, and more) with an admin dashboard for managing services and feedback.


🚀 Tech Stack
| Layer                 | Technology                                                     |
| --------------------- | -------------------------------------------------------------- |
| **Frontend**          | React.js (Vite), React-Bootstrap, React Router, React Toastify |
| **Backend**           | Node.js (Express), MySQL, JWT Authentication                   |
| **Password Security** | bcrypt                                                         |
| **API Testing**       | Postman / Browser / Axios calls                                |
| **Styling**           | Bootstrap + Custom CSS                                         |
| **Routing Security**  | Custom PrivateRoute with Role-based Access                     |


⚙️ Backend Setup
1️⃣ Install Dependencies
cd Server
npm install express mysql2 bcrypt jsonwebtoken cors body-parser
npm install --save-dev nodemon

2️⃣ Database Configuration (MySQL)

Create a database named:

CREATE DATABASE homeease;
USE homeease;

🧱 Tables
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    password VARCHAR(255)
);

CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    password VARCHAR(255)
);

CREATE TABLE services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10,2),
    description TEXT
);

CREATE TABLE feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    rating INT,
    comments TEXT
);

🧍 Insert Sample Admin
INSERT INTO admin (name, phone, email, password)
VALUES ('Admin', '9876543210', 'admin@gmail.com', '$2b$12$YourHashedPasswordHere');

3️⃣ Configure Database Connection

src/configs/DbConfig.js

import mysql from "mysql2/promise";

export function getConnectionObject() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "homeease"
  });
}

4️⃣ Start Backend Server

In Server/package.json:

"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}


Run it:

npm run dev

💻 Frontend Setup
1️⃣ Install Dependencies
cd Client
npm install

2️⃣ Run React App
npm run dev


The app will run at:

Frontend → http://localhost:5173/
Backend → http://localhost:3000/

🔐 Authentication & Roles

JWT Token is generated on login and stored in localStorage.

Role-based access control handled by:

PrivateRoute.jsx

RoleService.js

TokenService.js

Role	Access
ADMIN	Add/Edit/Delete Services, View Feedback
USER	View Services, Make Bookings, Give Feedback
🧠 Key Features
👤 User Features

Register/Login securely

Browse available services

Make payments

Give feedback

View About Us section

🧰 Admin Features

Login to admin dashboard

Add new services

Edit or Delete existing services

Manage feedback

⚡ Security

JWT-based authentication

Role-based route protection

Bcrypt-encrypted passwords

🧩 Important Constants
RoleConstant.js
export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER"
};

APIConstant.js

(Example)

export const SERVICE_ENDPOINTS = {
  ADD: "/api/services/add",
  GET_ALL: "/api/services",
  DELETE: "/api/services/delete/:id",
  UPDATE: "/api/services/update/:id"
};

export const PAYMENT_ENDPOINTS = {
  CREATE: "/api/payments/create"
};

🧪 Example Login API (POST)
POST /api/users/login
Content-Type: application/json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}


Response:

{
  "message": "Login successful",
  "token": "jwt_token_here",
  "role": "ADMIN"
}

📜 License

This project is built for educational and development purposes.

👨‍💻 Developed By

Prem Myana
Full Stack Developer — React, Node.js, MySQL
