# COMP3133 Assignment 1 - Employee Management System

Student ID: 101482699

## Description

Backend GraphQL API for managing employees built with Node.js, Express, Apollo Server, and MongoDB.

## Tech Stack

- Node.js
- Express
- Apollo Server (GraphQL)
- MongoDB with Mongoose
- bcryptjs for password hashing
- Cloudinary for employee photo uploads

## Setup

1. Clone the repo
2. Install dependencies:
```
npm install
```
3. Create a `.env` file (see `.env.example`):
```
MONGO_URI=mongodb://localhost:27017/comp3133_101482699_assigment1
PORT=4000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
4. Start the server:
```
npm start
```
5. Open http://localhost:4000/graphql

## Sample User for Testing

- Username: `admin`
- Email: `admin@example.com`
- Password: `admin123`

## GraphQL API

### User Operations

**Signup**
```
mutation {
  signup(username: "admin", email: "admin@example.com", password: "admin123") {
    id
    username
    email
  }
}
```

**Login**
```
query {
  login(usernameOrEmail: "admin", password: "admin123") {
    id
    username
    email
  }
}
```

### Employee Operations

**Add Employee**
```
mutation {
  addEmployee(
    first_name: "John"
    last_name: "Doe"
    email: "john@example.com"
    gender: "Male"
    designation: "Developer"
    salary: 5000
    date_of_joining: "2025-01-15"
    department: "Engineering"
  ) {
    id
    first_name
    last_name
    email
  }
}
```

**Get All Employees**
```
query {
  getAllEmployees {
    id
    first_name
    last_name
    email
    designation
    department
    salary
  }
}
```

**Get Employee by ID**
```
query {
  getEmployeeById(id: "EMPLOYEE_ID") {
    id
    first_name
    last_name
    email
    designation
    salary
    department
  }
}
```

**Update Employee**
```
mutation {
  updateEmployee(id: "EMPLOYEE_ID", salary: 6500, designation: "Senior Developer") {
    id
    first_name
    last_name
    designation
    salary
  }
}
```

**Delete Employee**
```
mutation {
  deleteEmployee(id: "EMPLOYEE_ID") {
    id
    first_name
    last_name
  }
}
```

**Search by Department or Designation**
```
query {
  searchEmployees(department: "Engineering") {
    id
    first_name
    last_name
    department
    designation
  }
}
```
