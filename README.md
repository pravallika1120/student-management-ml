# 🎓 Student Management System Using Machine Learning

A full-stack web-based **Student Management System Using Machine Learning** developed as a university academic project. The application provides secure student authentication, student record management, academic information management, dashboard statistics, and Machine Learning-based student performance prediction.

---

## 📌 Project Overview

The **Student Management System Using Machine Learning** is designed to digitally manage student information and provide intelligent academic performance analysis.

The system provides separate functionalities for **Administrators and Students**. Administrators can add, view, update, and delete student records, while students can register, activate their accounts, log in securely, and access academic-related features.

The project integrates a modern web application with a Machine Learning service to provide an intelligent student management solution.

### Main Technologies

* React.js
* Vite
* Node.js
* Express.js
* MongoDB
* Mongoose
* Python
* Machine Learning
* JWT Authentication
* bcryptjs
* Axios
* Bootstrap

---

# 🎯 Objectives

The main objectives of this project are:

1. To develop a centralized student management system.
2. To reduce manual student record management.
3. To securely store student information.
4. To provide Admin and Student authentication.
5. To allow administrators to manage student records.
6. To provide students with secure account registration and login.
7. To calculate important academic statistics.
8. To integrate Machine Learning into the student management system.
9. To predict student academic performance.
10. To provide a simple and user-friendly web interface.

---

# ✨ Features

## 👨‍💼 Administrator Features

* Secure Admin Login
* Admin Dashboard
* View Total Students
* View Average CGPA
* View Average Attendance
* Add Student
* View Students
* Search Student Records
* Edit Student Information
* Delete Student Information
* Manage Student Academic Information
* Machine Learning Prediction
* View Prediction History
* Logout

---

## 👨‍🎓 Student Features

* Student Login
* Student Registration
* Existing Student Account Activation
* Gmail ID Verification
* Password Creation
* Secure Authentication
* Student Dashboard
* Academic Information Access
* Machine Learning Performance Prediction
* Logout

---

# 🔐 Authentication System

The application provides authentication for both administrators and students.

Authentication is implemented using:

* JSON Web Token (JWT)
* bcryptjs
* Role-based access

Passwords are hashed before being stored in the database.

### Admin Authentication

```text
Admin Login
     ↓
Validate Email and Password
     ↓
Generate JWT Token
     ↓
Admin Dashboard
```

### Student Authentication

```text
Student Registration / Activation
             ↓
       Create Password
             ↓
            Login
             ↓
       Validate Credentials
             ↓
        Generate JWT Token
             ↓
       Student Dashboard
```

---

# 🧑‍🎓 Student Registration

The system supports two types of student registration.

## 1. Existing Student

If the administrator has already added the student's information, the student can activate the existing record.

```text
Student Login Page
        ↓
Activate Student Account
        ↓
Enter Gmail ID
        ↓
Check Student Database
        ↓
Student Found
        ↓
Create Password
        ↓
Account Activated
        ↓
Login
```

The student does not need to enter all academic information again.

---

## 2. New Student

If the student does not already exist in the database, the student can create a new account.

```text
Student Login Page
        ↓
New Student Registration
        ↓
Enter Student Details
        ↓
Create Account
        ↓
Login
```

---

# 🧠 Machine Learning Module

The project contains a Machine Learning module that can be used to predict student academic performance.

Academic information can include:

* CGPA
* Attendance
* Internal Marks
* Assignment Marks
* Previous Marks
* Study Hours
* Backlogs

### ML Workflow

```text
Student Academic Data
          ↓
     Data Processing
          ↓
    Feature Selection
          ↓
   ML Model Processing
          ↓
 Performance Prediction
          ↓
    Prediction Result
```

The Machine Learning service is separated from the main backend so that the ML component can be developed and improved independently.

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │       Users         │
                         │   Admin / Student   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │       + Vite        │
                         └──────────┬──────────┘
                                    │
                              HTTP / Axios
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Node.js + Express.js │
                         │      Backend API     │
                         └───────┬───────┬─────┘
                                 │       │
                     ┌───────────┘       └────────────┐
                     ▼                                ▼
             ┌───────────────┐              ┌────────────────┐
             │    MongoDB    │              │  ML Service    │
             │    Database   │              │    Python      │
             └───────────────┘              └────────────────┘
```

---

# 🛠️ Technologies Used

## Frontend

| Technology       | Purpose                             |
| ---------------- | ----------------------------------- |
| React.js         | User interface                      |
| Vite             | Frontend development and build tool |
| JavaScript       | Application logic                   |
| HTML5            | Page structure                      |
| CSS3             | Styling                             |
| Bootstrap        | Responsive UI                       |
| Axios            | API communication                   |
| React Router DOM | Page navigation                     |

---

## Backend

| Technology | Purpose                    |
| ---------- | -------------------------- |
| Node.js    | Backend runtime            |
| Express.js | REST API framework         |
| Mongoose   | MongoDB object modeling    |
| MongoDB    | Database                   |
| JWT        | Authentication             |
| bcryptjs   | Password hashing           |
| CORS       | Cross-origin communication |
| dotenv     | Environment configuration  |

---

## Machine Learning

| Technology       | Purpose                               |
| ---------------- | ------------------------------------- |
| Python           | ML service                            |
| Machine Learning | Student performance prediction        |
| Python Libraries | Data processing and model development |

---

## Development Tools

* Visual Studio Code
* Git
* GitHub
* MongoDB Compass
* MongoDB Atlas
* Postman
* Web Browser

---

# 📂 Project Structure

```text
Student-Management-ML/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   └── userController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Student.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── createAdmin.js
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── PredictionForm.jsx
│   │   │   └── StudentCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Students.jsx
│   │   │   ├── AddStudent.jsx
│   │   │   ├── EditStudent.jsx
│   │   │   ├── Prediction.jsx
│   │   │   └── PredictionHistory.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── ml-service/
│   │
│   ├── model files
│   ├── Python files
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

> **Note:** Update the folder/file names above if your actual project structure is different.

---

# 🖥️ Application Modules

## 1. Login Module

The login page allows users to securely authenticate.

Users can select the appropriate login option and enter their credentials.

```text
Email
Password
Login
```

The system validates the credentials and generates a JWT token after successful authentication.

---

# 2. Admin Dashboard

The Admin Dashboard provides an overview of the complete student management system.

### Dashboard Statistics

```text
Total Students
Average CGPA
Average Attendance
```

### Dashboard Navigation

```text
Dashboard
Students
Add Student
ML Prediction
Prediction History
Logout
```

---

# 3. Add Student Module

The administrator can add student academic information.

Example fields:

```text
Student ID
Name
Email
Phone
Department
Year
CGPA
Attendance
Internal Marks
Assignment Marks
Previous Marks
Study Hours
Backlogs
```

After successful submission, the student information is stored in MongoDB.

---

# 4. Student Management Module

The administrator can manage student records.

Operations include:

```text
Add Student
View Student
Edit Student
Delete Student
```

The student list can contain:

```text
Student ID
Name
Email
Department
Year
CGPA
Attendance
```

---

# 5. Student Registration Module

The registration system supports both:

```text
Existing Student Account Activation
```

and:

```text
New Student Registration
```

This makes the system flexible for students whose records are already present and students who are completely new to the system.

---

# 6. Machine Learning Prediction Module

The ML Prediction module accepts academic information and sends the required data to the Machine Learning service.

```text
Academic Information
        ↓
Frontend
        ↓
Backend API
        ↓
ML Service
        ↓
Machine Learning Model
        ↓
Prediction
        ↓
Frontend Result
```

---

# 7. Prediction History

The system can maintain previous prediction results so that administrators or authorized users can review earlier predictions.

---

# 🗄️ Database

MongoDB is used as the database.

The database stores user and student information.

## User Collection

Example fields:

```text
name
email
password
role
studentId
createdAt
updatedAt
```

## Student Collection

Example fields:

```text
studentId
name
email
phone
department
year
cgpa
attendance
internalMarks
assignmentMarks
previousMarks
studyHours
backlogs
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

If your application uses a different variable name such as `MONGODB_URI`, use the exact variable name required by your backend code.

### ⚠️ Important

Never upload passwords, database credentials, API keys, or JWT secrets to GitHub.

Add the following to `.gitignore`:

```text
.env
node_modules/
```

---

# 🚀 Installation and Setup

## Prerequisites

Install:

* Node.js
* npm
* Python
* MongoDB or MongoDB Atlas
* Git
* Visual Studio Code
* Postman

---

# 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/student-management-ml.git
```

Then:

```bash
cd student-management-ml
```

---

# 2. Backend Setup

Open a terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create the `.env` file.

Example:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
node server.js
```

The backend should run on:

```text
http://localhost:5000
```

---

# 3. Create Administrator Account

If your project contains `createAdmin.js`, run:

```bash
node createAdmin.js
```

This creates the administrator account in the MongoDB database.

---

# 4. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

Vite will normally provide a URL similar to:

```text
http://localhost:5173
```

Open that address in a web browser.

---

# 5. Machine Learning Service Setup

Open another terminal:

```bash
cd ml-service
```

Create and activate a Python virtual environment if required:

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the ML service using the Python file configured in your project.

Example:

```bash
python app.py
```

> Replace `app.py` with the actual ML service entry file in your project.

---

# 🔗 API Endpoints

The exact endpoint names depend on the backend implementation.

Typical endpoints are:

## Authentication

### Register

```http
POST /api/users/register
```

### Login

```http
POST /api/users/login
```

---

## Students

### Add Student

```http
POST /api/students
```

### Get All Students

```http
GET /api/students
```

### Get Student by ID

```http
GET /api/students/:id
```

### Update Student

```http
PUT /api/students/:id
```

### Delete Student

```http
DELETE /api/students/:id
```

---

# 🧪 Testing

The application can be tested using:

* Browser
* Postman
* MongoDB Compass
* Browser Developer Tools

## Authentication Tests

Test:

```text
Valid Login
Invalid Email
Invalid Password
Existing Student Activation
New Student Registration
Logout
```

## Student Management Tests

Test:

```text
Add Student
View Student
Edit Student
Delete Student
```

## ML Tests

Test:

```text
Enter Academic Data
        ↓
Submit Prediction
        ↓
ML Service Processes Data
        ↓
Prediction Generated
        ↓
Display Result
```

---

# 🔒 Security

The application includes:

* JWT-based authentication
* Password hashing using bcryptjs
* Role-based access
* MongoDB authentication
* Environment variables
* CORS configuration
* `.env` protection
* Protected API routes

Sensitive credentials should never be committed to GitHub.

---

# 📊 Dashboard Statistics

The Admin Dashboard provides important academic statistics.

### Total Students

Displays the total number of students stored in the database.

### Average CGPA

Calculates the average CGPA of students.

### Average Attendance

Calculates the average attendance percentage.

These statistics provide a quick overview of the academic status of students.

---

# 📸 Screenshots

Create a folder named:

```text
screenshots/
```

Add screenshots of your application.

Recommended screenshots:

```text
screenshots/
├── login.png
├── admin-dashboard.png
├── student-list.png
├── add-student.png
├── edit-student.png
├── student-registration.png
├── prediction.png
└── prediction-history.png
```

Then add them to this README.

Example:

```markdown
## Login Page

![Login Page](screenshots/login.png)

## Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)

## Student Management

![Student Management](screenshots/student-list.png)

## ML Prediction

![ML Prediction](screenshots/prediction.png)
```

---

# 📈 ML Prediction Example

Example input:

```text
CGPA             : 8.2
Attendance       : 87%
Internal Marks   : 82
Assignment Marks : 85
Study Hours      : 4
Backlogs         : 0
```

The ML service processes the input and returns a prediction.

Example:

```text
Predicted Performance: Good
```

> The actual prediction output depends on the Machine Learning model implemented in the project.

---

# 🔄 Complete System Workflow

```text
                     START
                       │
                       ▼
                Open Application
                       │
                       ▼
                  Login Page
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
            Admin            Student
              │                 │
              ▼                 ▼
       Admin Authentication   Registration
              │                 │
              ▼                 ▼
       Admin Dashboard       Student Login
              │                 │
       ┌──────┼───────┐        ▼
       │      │       │   Student Dashboard
       ▼      ▼       ▼
    Students Add    ML
    Management      Prediction
       │              │
       ▼              ▼
   CRUD Records   ML Prediction
       │              │
       └──────┬───────┘
              ▼
           Database
              │
              ▼
             END
```

---

# 📋 Advantages

* Centralized student information
* Easy student record management
* Secure authentication
* Admin and Student roles
* Reduced paperwork
* Reduced manual data management
* Academic statistics
* Machine Learning integration
* User-friendly interface
* REST API architecture
* Modular project structure
* Scalable architecture

---

# ⚠️ Limitations

The current version may have the following limitations:

* Prediction accuracy depends on the training dataset.
* Internet connectivity may be required for cloud-hosted MongoDB.
* ML predictions depend on the quality of input data.
* Advanced notification features are not included.
* Mobile application support is not included in the current version.

---

# 🔮 Future Enhancements

The project can be further improved by adding:

* Email verification
* Forgot Password
* Password Reset
* Student Profile Management
* Attendance Graphs
* CGPA Graphs
* Academic Performance Charts
* Automated Email Notifications
* PDF Student Reports
* Advanced Machine Learning Models
* Student Performance Alerts
* Cloud Deployment
* Mobile Application
* Advanced Role-Based Access Control
* Admin Analytics Dashboard
* Real-time notifications

---

# 🌐 Deployment

The application can be deployed using cloud platforms.

Possible deployment options include:

### Frontend

* Vercel
* Netlify

### Backend

* Render
* Railway
* AWS

### Database

* MongoDB Atlas

### Machine Learning Service

* AWS
* Render
* Railway
* Other Python-compatible cloud platforms

---

# 🐙 Git and GitHub

Initialize Git:

```bash
git init
```

Add project files:

```bash
git add .
```

Commit:

```bash
git commit -m "Initial commit"
```

Add the GitHub repository:

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_URL
```

Push the project:

```bash
git branch -M main
git push -u origin main
```

---

# 📌 Important GitHub Notes

Do **not** commit:

```text
.env
node_modules/
venv/
__pycache__/
*.pyc
```

A suitable `.gitignore` can contain:

```text
# Environment
.env

# Node
node_modules/
npm-debug.log*

# Python
venv/
__pycache__/
*.pyc

# Build
dist/
build/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

---

# 🎓 Academic Project Information

| Category         | Details                                          |
| ---------------- | ------------------------------------------------ |
| Project Title    | Student Management System Using Machine Learning |
| Project Type     | University Academic Project                      |
| Domain           | Web Development + Machine Learning               |
| Frontend         | React.js + Vite                                  |
| Backend          | Node.js + Express.js                             |
| Database         | MongoDB                                          |
| Machine Learning | Python                                           |
| Authentication   | JWT + bcryptjs                                   |
| API              | REST API                                         |
| Version Control  | Git + GitHub                                     |

---

# 👩‍💻 Author

**Pravallika U**

Computer Science / Information Technology

---

# 📜 License

This project is developed for **academic and educational purposes**.

---

# ⭐ Conclusion

The **Student Management System Using Machine Learning** provides a centralized platform for managing student information and integrating Machine Learning-based academic performance prediction.

By combining:

```text
React.js
    +
Node.js
    +
Express.js
    +
MongoDB
    +
Python
    +
Machine Learning
```

the project provides an integrated solution for student record management, secure authentication, academic information management, and intelligent performance prediction.

The system can be further enhanced with advanced Machine Learning models, analytics, notifications, cloud deployment, and mobile application support.
