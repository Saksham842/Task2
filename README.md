# Smart Leads Dashboard - Internship Assignment

A modern, full-stack web application for managing potential customers (leads). Built with React, Node.js, and MySQL.

**Deployment Link:** [Insert Your Vercel Link Here]
**Backend API URL:** [Insert Your Render Link Here]

## Features
- **Authentication & Authorization**: Secure JWT login with distinct `Admin` and `Sales User` roles.
- **Lead Management**: Complete CRUD operations for leads.
- **Advanced Filtering**: Debounced search, status filtering, and source filtering.
- **Pagination**: Server-side pagination with limit/offset.
- **Export**: Client-side CSV export functionality.

## Setup Instructions

### Prerequisites
- Node.js installed
- MySQL Server running

### 1. Database Setup
Execute the provided SQL schema to create your tables and default users:
```bash
mysql -u root -p < server/database/schema.sql
```
*(Note: If using Aiven/cloud DB, just paste the contents of `schema.sql` into your query editor).*

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env  # (Fill in your actual DB credentials in .env)
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
cp .env.example .env  # (Point VITE_API_URL to your backend, usually localhost:5000)
npm run dev
```

## API Documentation

### Authentication (`/api/auth`)
- `POST /register` - Register a new user
  - Body: `{ "name": "John", "email": "john@test.com", "password": "pass", "role": "Admin" }`
- `POST /login` - Login to an existing account
  - Body: `{ "email": "john@test.com", "password": "pass" }`
- `GET /profile` - Get current user profile (Requires Auth Header)

### Leads (`/api/leads`) *(All routes require Auth Header)*
- `GET /` - Fetch paginated leads
  - **Query Params:**
    - `search` (string)
    - `status` (New, Contacted, Qualified, Lost)
    - `source` (Website, Instagram, Referral)
    - `sort` (latest, oldest)
    - `page` (number)
    - `limit` (number)
- `POST /` - Create a new lead
  - Body: `{ "name": "Jane", "email": "jane@test.com", "status": "New", "source": "Website" }`
- `PUT /:id` - Update an existing lead
- `DELETE /:id` - Delete a lead *(Admin Role Required)*

## Default Test Users
| Role | Email | Password |
|---|---|---|
| Admin | `admin@example.com` | `password123` |
| Sales User | `sales@example.com` | `password123` |
