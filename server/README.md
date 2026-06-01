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

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register a new user |
| POST | `/auth/login` | No | Login, returns JWT |
| GET | `/auth/profile` | Yes | Get logged-in user profile |
| GET | `/auth/users` | Yes | List all users |

### Tasks

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/tasks` | Yes | Any | List tasks (users see only their own) |
| GET | `/tasks/:id` | Yes | Any | Get a single task |
| POST | `/tasks` | Yes | Admin | Create a task |
| PUT | `/tasks/:id` | Yes | Any | Update task (users: status only) |
| DELETE | `/tasks/:id` | Yes | Admin | Delete a task |

### Auth Header

```
Authorization: Bearer <token>
```

## Role Rules

- **Admin** — can create/edit/delete any task, view all tasks
- **User** — can only see their assigned tasks, update status only

## Sample Requests (Postman)

Import `TaskManager.postman_collection.json` into Postman. Set `{{token}}` after login.
