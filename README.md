# Classroom Service API

## Overview
The Classroom Service API is a Node.js-based backend service built with Express.js and Firestore. It provides endpoints for managing virtual classrooms, including creating, retrieving, updating, and deleting classrooms. The service is secured with Google OAuth authentication and deployed on Google Cloud Run.

## Deployment
The API is deployed on **Google Cloud Run** at:
**[https://classroomservice-403893624463.us-central1.run.app](https://classroomservice-403893624463.us-central1.run.app)**

## Tech Stack
- **Node.js** (Express.js)
- **Firestore (Google Firebase)**
- **Google OAuth for authentication**
- **Google Cloud Run for deployment**

---
## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or later)
- **Firebase CLI**
- **Google Cloud SDK** (for deployment)

### Installation
Clone the repository and install dependencies:
```sh
git clone <repository-url>
cd classroom-service
npm install
```

### Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```env
PORT=5001
GOOGLE_APPLICATION_CREDENTIALS=./path/to/firebaseAdmin.json
FRONTEND_URL=http://localhost:8080
```

### Running Locally
Start the development server:
```sh
npm start
```
The API will be available at `http://localhost:5001`

---
## API Endpoints

### Authentication Middleware
All protected routes require authentication via a valid **Google OAuth access token**.

---
### Classroom Routes
Base URL: `https://classroomservice-403893624463.us-central1.run.app/api/classrooms`

#### **Create a Classroom**
```http
POST /api/classrooms
```
**Headers:**
```json
{
  "Authorization": "Bearer <ACCESS_TOKEN>"
}
```
**Body:**
```json
{
  "title": "Math 101",
  "subject": "Mathematics",
  "room": "A-12",
  "description": "Algebra and Trigonometry"
}
```
**Response:**
```json
{
  "id": "abc123",
  "title": "Math 101",
  "subject": "Mathematics",
  "room": "A-12",
  "description": "Algebra and Trigonometry",
  "owner_email": "user@example.com"
}
```

#### **Get All Classrooms**
```http
GET /api/classrooms
```
**Headers:**
```json
{
  "Authorization": "Bearer <ACCESS_TOKEN>"
}
```
**Response:**
```json
{
  "classrooms": [
    {
      "id": "abc123",
      "title": "Math 101",
      "subject": "Mathematics",
      "room": "A-12",
      "description": "Algebra and Trigonometry",
      "owner_email": "user@example.com"
    }
  ]
}
```

#### **Get a Classroom by ID**
```http
GET /api/classrooms/:id
```
**Headers:**
```json
{
  "Authorization": "Bearer <ACCESS_TOKEN>"
}
```
**Response:**
```json
{
  "id": "abc123",
  "title": "Math 101",
  "subject": "Mathematics",
  "room": "A-12",
  "description": "Algebra and Trigonometry",
  "owner_email": "user@example.com"
}
```

#### **Update a Classroom**
```http
PUT
