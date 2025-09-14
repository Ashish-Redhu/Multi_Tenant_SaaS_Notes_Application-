# NoteSphere
## About
I have built and deployed the Multi-Tenant SaaS Notes Application on Vercel. The application supports multiple tenants with strict data isolation, role-based access using JWT authentication, and subscription-based feature limits. Both Admin and Member roles are implemented, along with endpoints for managing notes and upgrading subscriptions.

The backend and frontend are fully hosted on Vercel with CORS enabled and a health check endpoint provided. The app has been tested with predefined accounts to ensure proper functionality, security, and smooth user experience.


## Technolies Used
**1. Frontend**

&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="30"/> React.js  &nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://logowik.com/content/uploads/images/tailwind-css3232.logowik.com.webp" width="30" alt="Tailwind CSS"/> Tailwind CSS  


**2. Backend**

&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" width="30" alt="Express.js"/> Express.js  &nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" width="30" alt="Node.js"/> Node.js  


**3. Authentication and Database**

&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://jwt.io/img/logo-asset.svg" width="30" alt="JWT"/> JWT (Authentication)
&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg" width="30" alt="MongoDB"/> MongoDB






# Project Structure 
```  
/Multi_Tenant_SaaS_Notes_Application
|
├── /backend
│   ├── /controllers
│   │   └── notesController.js       # Handles CRUD operations for notes
|   |   └── tenancyController.js     # Handles Tenancy upgradation
|   |   └── userController.js        # Handles new user invites. 
|   |   
│   ├── /models
│   │   └── noteModel.js             # Mongoose schema for notes (Every note model has a reference to it's author.)
│   │   └── userModel.js             # Mongoose schema for notes (Every user has reference of it's tenancy, ["admin", "member"])
│   │   └── tenancyModel.js          # Mongoose schema for notes
|   |  
│   ├── /routes
│   │   └── notesRoutes.js           # Defines routes for notes operations
│   │   └── userRoutes.js            # Defines routes for user-related tasks.
│   │   └── tenancyRoutes.js         # Defines routes for tenancy-updations.
│   │   
│   ├── /middleware
│   │   └── auth.js                  # JWT authentication middleware
│   │   └── adminCheck.js            # Role-based access control middleware
│   │   └── checkNoteLimit.js        # Middleware to check if note-limit reached for free-account.
│   │  
│   ├── .env                         # File to store environment variables securely. 
│   ├── .gitignore                   # File to stop git from tracking .env, nodemodules etc.
│   |
│   └── server.js                    # Main server file
|
|----------------------------------------------------------------------------------------------------
├── /frontend
├── src/
│   ├── components/
│   │   ├── dashboardComponents/     # Components that are specific to the Dashboard page only. 
│   │   │   ├── Form.jsx
│   │   │   ├── HeaderDashboard.jsx
│   │   │   ├── PageCard.jsx
│   │   │   └── UserInfo.jsx
│   │   │   
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── InfoSection.jsx
│   │  
│   ├── contexts/
│   │   └── UserContext.jsx         # To store user and states.
│   │   
│   ├── pages/
│   │   ├── Dashboard.jsx           # The dashboard of each Tenancy.
│   │   ├── Home.jsx                # The landing page of website. 
│   │   ├── LoginForm.jsx           
│   │   └── NoteDetails.jsx
│   │  
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
|
├── README.md                       # Project documentation


```


# 📘 Project Setup Guide

This repository contains the **Frontend** and **Backend** code required to run the project locally. Follow the steps below to set up the development environment.

---

## ✅ Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/get-npm)
- MongoDB (local installation or MongoDB Atlas)

---

## 📥 1. Clone the Repository

```bash
git clone https://github.com/Ashish-Redhu/Multi_Tenant_SaaS_Notes_Application-.git
cd Multi_Tenant_SaaS_Notes_Application-
```
## ⚙ 2. Frontend Setup
- &nbsp;Navigate to the frontend folder: ```cd frontend```
- &nbsp;Install dependencies: ```npm install```
- &nbsp;Create a .env file in the frontend folder and add the following environment variables: ```VITE_BACKEND_URI=url_of_your_backend_server```
- Start the frontend development server:```npm run dev```

## ⚙ 3. Backend Setup

- &nbsp;Navigate to the backend folder:```cd ../backend```
- &nbsp;Install dependencies:```npm install```
- &nbsp;Create a .env file in the backend folder and add the following environment variables:
```
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
FRONTEND_URI=url_of_your_frontend_server
NODE_ENV=Development
```
- &nbsp;Start the backend development server:```npm run dev```

### 🚀 Start Building!
You're now ready to explore, develop, and contribute to this project. If you encounter any issues, check that environment variables are set correctly and that MongoDB is running.


# 🔗 Links

You can explore the project using the links below:

* Backend Server: [View here](https://backendnotessaasapp.vercel.app/) – API endpoints and backend functionalities.
* Frontend Server: [View here](https://frontendnotessaasapp.vercel.app/) – Explore the user interface and interact with the app.
