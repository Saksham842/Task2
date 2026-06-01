# Task Manager API

A task assignment API with user authentication, role-based access, and CRUD operations.

## Tech Stack

- **Runtime:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Auth:** bcryptjs + JSON Web Token

## Setup

```bash
cd server
npm install
```

Create a `.env` file:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run:
```bash
npm run dev
```

---

## API Documentation

Base URL: `http://localhost:5000/api/v1`

---

### Auth Endpoints

#### Register

Creates a new user account.

**Request**
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** `201 Created`
```json
{
  "message": "User registered successfully"
}
```

**Errors**
| Status | Message |
|--------|---------|
| 400 | Name, email, and password are required |
| 400 | Password must be at least 6 characters |
| 400 | User already exists |
| 500 | (server error message) |

---

#### Login

Authenticates a user and returns a JWT token.

**Request**
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "665a1b2c3d4e5f6a7b8c9d0e",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

**Errors**
| Status | Message |
|--------|---------|
| 400 | Email and password are required |
| 400 | Invalid credentials |
| 500 | (server error message) |

---

#### Get Profile

Returns the authenticated user's profile.

**Request**
```
GET /auth/profile
Authorization: Bearer <token>
```

**Response** `200 OK`
```json
{
  "id": "665a1b2c3d4e5f6a7b8c9d0e",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "User",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

**Errors**
| Status | Message |
|--------|---------|
| 401 | No token, authorization denied |
| 401 | Token is not valid |
| 404 | User not found |

---

#### Get All Users

Returns a list of all users (for assigning tasks).

**Request**
```
GET /auth/users
Authorization: Bearer <token>
```

**Response** `200 OK`
```json
[
  {
    "_id": "665a1b2c3d4e5f6a7b8c9d0e",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  },
  {
    "_id": "665a1b2c3d4e5f6a7b8c9d1f",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "Admin"
  }
]
```

---

### Task Endpoints

All task endpoints require authentication.

#### Get All Tasks

Returns tasks. Regular users see only their own assigned tasks. Admins see all.

**Request**
```
GET /tasks
Authorization: Bearer <token>
```

**Response** `200 OK`
```json
[
  {
    "_id": "665a1b2c3d4e5f6a7b8c9d10",
    "title": "Fix login bug",
    "description": "User cannot login with special characters",
    "status": "Pending",
    "assignedTo": {
      "_id": "665a1b2c3d4e5f6a7b8c9d0e",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "User"
    },
    "assignedBy": {
      "_id": "665a1b2c3d4e5f6a7b8c9d1f",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "Admin"
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

---

#### Get Task By ID

Returns a single task by its ID.

**Request**
```
GET /tasks/665a1b2c3d4e5f6a7b8c9d10
Authorization: Bearer <token>
```

**Response** `200 OK` — Same structure as a single task object above.

**Errors**
| Status | Message |
|--------|---------|
| 404 | Task not found |
| 403 | Access denied |

---

#### Create Task (Admin only)

Creates a new task and assigns it to a user.

**Request**
```
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Fix login bug",
  "description": "User cannot login with special characters",
  "assignedTo": "665a1b2c3d4e5f6a7b8c9d0e",
  "status": "Pending"
}
```

**Response** `201 Created`
```json
{
  "message": "Task created",
  "task": {
    "_id": "665a1b2c3d4e5f6a7b8c9d10",
    "title": "Fix login bug",
    "description": "User cannot login with special characters",
    "status": "Pending",
    "assignedTo": { ... },
    "assignedBy": { ... },
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Errors**
| Status | Message |
|--------|---------|
| 400 | Title and assignedTo are required |
| 403 | Access denied |
| 500 | (server error message) |

---

#### Update Task

Admins can update all fields. Regular users can only update the status.

**Request** (Admin — full update)
```
PUT /tasks/665a1b2c3d4e5f6a7b8c9d10
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Fix login bug (updated)",
  "description": "Updated description",
  "assignedTo": "665a1b2c3d4e5f6a7b8c9d0e",
  "status": "In Progress"
}
```

**Request** (Regular user — status only)
```
PUT /tasks/665a1b2c3d4e5f6a7b8c9d10
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Completed"
}
```

**Response** `200 OK`
```json
{
  "message": "Task updated",
  "task": { ... }
}
```

**Errors**
| Status | Message |
|--------|---------|
| 400 | Users can only update status |
| 403 | Access denied |
| 404 | Task not found |

---

#### Delete Task (Admin only)

Deletes a task permanently.

**Request**
```
DELETE /tasks/665a1b2c3d4e5f6a7b8c9d10
Authorization: Bearer <token>
```

**Response** `200 OK`
```json
{
  "message": "Task deleted"
}
```

**Errors**
| Status | Message |
|--------|---------|
| 403 | Access denied |
| 404 | Task not found |

---

## Role Rules

- **Admin** — Create, edit, and delete any task; view all tasks
- **User** — View only their own assigned tasks; update status only

## Sample Requests (Postman)

Import `TaskManager.postman_collection.json` into Postman. Set `{{token}}` after login.

---

## Scalability Notes

- **Microservices** — Auth and task management can be split into separate services. Auth handles JWT issuance/verification, Task service handles business logic. Each scales independently.
- **Caching** — Frequently accessed data (user roles, task lists) can be cached with Redis. Invalidate cache on writes (task create/update/delete) to keep reads fast.
- **Load Balancing** — Multiple API instances behind a reverse proxy (NGINX, HAProxy). Use a shared session store or stateless JWT so any instance can handle any request.
- **Database** — Add MongoDB read replicas for read-heavy workloads. Index frequently queried fields (`assignedTo`, `status`) for faster queries.
