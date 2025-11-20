# CSS Society Backend API Documentation

## 📚 Overview

This is the backend API for the CSS Society website built with Express.js, MongoDB, and following the MVC architecture pattern.

**Base URL:** `http://localhost:5000/api`

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

## 📋 API Endpoints

### 1️⃣ **USER ENDPOINTS** (`/api/users`)

#### Register User

- **Method:** POST
- **Endpoint:** `/register`
- **Auth:** No
- **Body:**

```json
{
      "email": "user@example.com",
      "password": "SecurePassword123",
      "fullName": "John Doe"
}
```

- **Response:**

```json
{
      "status": "success",
      "message": "User registered successfully",
      "data": {
            "user": { "id": "...", "email": "...", "fullName": "...", "role": "user" },
            "token": "jwt_token_here"
      }
}
```

#### Login User

- **Method:** POST
- **Endpoint:** `/login`
- **Auth:** No
- **Body:**

```json
{
      "email": "user@example.com",
      "password": "SecurePassword123"
}
```

- **Response:** Similar to register response

#### Get User Profile

- **Method:** GET
- **Endpoint:** `/profile`
- **Auth:** Required
- **Response:**

```json
{
  "status": "success",
  "message": "Profile retrieved successfully",
  "data": { "user": {...} }
}
```

#### Update User Profile

- **Method:** PUT
- **Endpoint:** `/profile`
- **Auth:** Required
- **Body:**

```json
{
      "fullName": "Jane Doe",
      "email": "newemail@example.com"
}
```

#### Change Password

- **Method:** POST
- **Endpoint:** `/change-password`
- **Auth:** Required
- **Body:**

```json
{
      "oldPassword": "OldPassword123",
      "newPassword": "NewPassword456",
      "confirmPassword": "NewPassword456"
}
```

#### Delete Account

- **Method:** DELETE
- **Endpoint:** `/account`
- **Auth:** Required

#### Get All Users (Admin Only)

- **Method:** GET
- **Endpoint:** `/all`
- **Auth:** Required (Admin)

#### Get User by ID

- **Method:** GET
- **Endpoint:** `/:id`
- **Auth:** Required
- **Params:** `id` - User ID

#### Deactivate User (Admin Only)

- **Method:** PUT
- **Endpoint:** `/:id/deactivate`
- **Auth:** Required (Admin)

#### Activate User (Admin Only)

- **Method:** PUT
- **Endpoint:** `/:id/activate`
- **Auth:** Required (Admin)

---

### 2️⃣ **EVENT ENDPOINTS** (`/api/events`)

#### Get All Events

- **Method:** GET
- **Endpoint:** `/`
- **Auth:** No
- **Query Parameters:**
     - `category` - Filter by category (workshop, competition, seminar, hackathon, networking, other)
     - `status` - Filter by status (upcoming, ongoing, completed, cancelled)
- **Response:**

```json
{
  "status": "success",
  "message": "Events retrieved successfully",
  "data": {
    "count": 5,
    "events": [...]
  }
}
```

#### Get Event by ID

- **Method:** GET
- **Endpoint:** `/:id`
- **Auth:** No

#### Create Event (Admin Only)

- **Method:** POST
- **Endpoint:** `/`
- **Auth:** Required (Admin)
- **Body:**

```json
{
      "title": "Tech Taakra 2025",
      "description": "Annual programming competition",
      "date": "2025-03-15T10:00:00Z",
      "location": "GC University Lahore",
      "category": "competition",
      "maxParticipants": 100,
      "image": "event_image_url"
}
```

#### Update Event (Admin Only)

- **Method:** PUT
- **Endpoint:** `/:id`
- **Auth:** Required (Admin)
- **Body:** (All fields optional)

```json
{
      "title": "Updated Title",
      "status": "ongoing",
      "maxParticipants": 150
}
```

#### Delete Event (Admin Only)

- **Method:** DELETE
- **Endpoint:** `/:id`
- **Auth:** Required (Admin)

#### Register for Event

- **Method:** POST
- **Endpoint:** `/:id/register`
- **Auth:** Required
- **Body:** Empty

#### Unregister from Event

- **Method:** DELETE
- **Endpoint:** `/:id/unregister`
- **Auth:** Required

#### Get User's Registered Events

- **Method:** GET
- **Endpoint:** `/user/my-events`
- **Auth:** Required

---

### 3️⃣ **ANNOUNCEMENT ENDPOINTS** (`/api/announcements`)

#### Get All Announcements (Public)

- **Method:** GET
- **Endpoint:** `/`
- **Auth:** No
- **Query Parameters:**
     - `category` - Filter by category (news, update, achievement, urgent, other)
     - `isPinned` - Filter pinned announcements (true/false)

#### Get Announcement by ID

- **Method:** GET
- **Endpoint:** `/:id`
- **Auth:** Required

#### Create Announcement (Admin Only)

- **Method:** POST
- **Endpoint:** `/`
- **Auth:** Required (Admin)
- **Body:**

```json
{
      "title": "CSS Annual Event Announced",
      "content": "Detailed announcement content here...",
      "category": "news",
      "image": "image_url",
      "isPinned": true,
      "isPublished": true
}
```

#### Get All Announcements (Admin)

- **Method:** GET
- **Endpoint:** `/admin/all`
- **Auth:** Required (Admin)
- **Note:** Includes unpublished announcements

#### Update Announcement (Admin Only)

- **Method:** PUT
- **Endpoint:** `/:id`
- **Auth:** Required (Admin)

#### Delete Announcement (Admin Only)

- **Method:** DELETE
- **Endpoint:** `/:id`
- **Auth:** Required (Admin)

#### Toggle Pin Announcement (Admin Only)

- **Method:** PATCH
- **Endpoint:** `/:id/toggle-pin`
- **Auth:** Required (Admin)

#### Toggle Publish Announcement (Admin Only)

- **Method:** PATCH
- **Endpoint:** `/:id/toggle-publish`
- **Auth:** Required (Admin)

---

### 4️⃣ **TEAM MEMBER ENDPOINTS** (`/api/team-members`)

#### Get All Team Members

- **Method:** GET
- **Endpoint:** `/`
- **Auth:** No
- **Query Parameters:**
     - `position` - Filter by position
     - `isActive` - Filter by status (true/false)

#### Get Active Team Members

- **Method:** GET
- **Endpoint:** `/active`
- **Auth:** No

#### Get Team Member by ID

- **Method:** GET
- **Endpoint:** `/:id`
- **Auth:** No

#### Create Team Member (Admin Only)

- **Method:** POST
- **Endpoint:** `/`
- **Auth:** Required (Admin)
- **Body:**

```json
{
      "name": "John Doe",
      "email": "john@gcu.edu.pk",
      "position": "President",
      "image": "profile_image_url",
      "bio": "Brief bio",
      "phone": "+92-123-4567890",
      "socialLinks": {
            "linkedin": "linkedin_url",
            "github": "github_url",
            "twitter": "twitter_url",
            "portfolio": "portfolio_url"
      }
}
```

#### Update Team Member (Admin Only)

- **Method:** PUT
- **Endpoint:** `/:id`
- **Auth:** Required (Admin)

#### Delete Team Member (Admin Only)

- **Method:** DELETE
- **Endpoint:** `/:id`
- **Auth:** Required (Admin)

#### Deactivate Team Member (Admin Only)

- **Method:** PATCH
- **Endpoint:** `/:id/deactivate`
- **Auth:** Required (Admin)

#### Activate Team Member (Admin Only)

- **Method:** PATCH
- **Endpoint:** `/:id/activate`
- **Auth:** Required (Admin)

---

## 🔑 Environment Variables

Create a `.env` file in the server directory:

```
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/css-society
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

ADMIN_EMAIL=admin@gcu.edu.pk
ADMIN_PASSWORD=Admin@123456

CORS_ORIGIN=http://localhost:5173
```

---

## 📊 Data Models

### User Model

```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  fullName: String,
  role: String (admin/user),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Event Model

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  date: Date,
  location: String,
  category: String,
  image: String,
  maxParticipants: Number,
  registrations: Array,
  status: String,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Announcement Model

```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  category: String,
  image: String,
  isPinned: Boolean,
  isPublished: Boolean,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### TeamMember Model

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  position: String,
  image: String,
  bio: String,
  phone: String,
  socialLinks: Object,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛡️ Error Handling

All errors return a consistent format:

```json
{
      "status": "error",
      "message": "Error message here",
      "data": null
}
```

### Common Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🚀 Installation & Setup

1. **Install dependencies:**

```bash
cd server
npm install
```

2. **Create `.env` file** with required variables

3. **Start MongoDB** (locally or connect to MongoDB Atlas)

4. **Run the server:**

```bash
npm start
# or for development
npm run dev
```

5. **Server starts at:** `http://localhost:5000`

---

## 📝 Notes

- All passwords are hashed using bcryptjs
- JWT tokens expire after 7 days (configurable)
- Admin user is automatically created on first run
- All inputs are validated and sanitized
- CORS is enabled for cross-origin requests

---

## 👨‍💻 Support

For issues or questions, please refer to the GitHub repository or contact the CSS Tech Team.
