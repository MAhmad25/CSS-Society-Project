# 🚀 CSS Society Backend Server

A modern, secure, and scalable Express.js backend API for the CSS Society website built with MongoDB and following the MVC architecture pattern.

## ✨ Features

- **Express.js Framework** - Fast, unopinionated Node.js web framework
- **MongoDB Database** - NoSQL database for flexible data management
- **JWT Authentication** - Secure token-based authentication
- **Bcrypt Password Hashing** - Industry-standard password security
- **Input Validation** - Comprehensive data validation using express-validator
- **Error Handling** - Global error handling with meaningful messages
- **CORS Support** - Cross-origin resource sharing enabled
- **Security** - Helmet middleware, input sanitization, and SQL injection prevention
- **MVC Architecture** - Clean separation of concerns (Models, Views, Controllers)
- **Auto Admin Creation** - Default admin user created on first run

## 📋 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js ^4.18.2** - Web framework
- **MongoDB 7.5.0** - Database
- **Mongoose** - MongoDB object modeling
- **bcryptjs ^2.4.3** - Password hashing
- **jsonwebtoken ^9.0.0** - JWT authentication
- **express-validator ^7.0.0** - Input validation
- **helmet ^7.0.0** - Security headers
- **CORS ^2.8.5** - Cross-origin support
- **dotenv ^16.3.1** - Environment variables

## 📁 Project Structure

```
server/
├── src/
│   ├── controllers/          # Business logic
│   │   ├── userController.js
│   │   ├── eventController.js
│   │   ├── announcementController.js
│   │   └── teamMemberController.js
│   ├── models/               # MongoDB schemas
│   │   ├── User.js
│   │   ├── Event.js
│   │   ├── Announcement.js
│   │   └── TeamMember.js
│   ├── routes/               # API routes
│   │   ├── userRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── announcementRoutes.js
│   │   └── teamMemberRoutes.js
│   └── middleware/           # Custom middleware
│       ├── auth.js           # Authentication & authorization
│       ├── errorHandler.js   # Global error handling
│       └── validation.js     # Input validation rules
├── config/
│   ├── database.js           # MongoDB connection
│   └── seedAdmin.js          # Admin user creation
├── app.js                    # Main application file
├── .env                      # Environment variables
├── package.json
├── .gitignore
└── API_DOCUMENTATION.md      # API docs
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or MongoDB Atlas) - [Setup Guide](https://www.mongodb.com/docs/manual/installation/)
- **npm** or **yarn** package manager

### Installation

1. **Navigate to server directory:**

```bash
cd server
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file:**

```bash
cp .env.example .env  # or create manually
```

4. **Configure environment variables:**
   Edit `.env` with your settings:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/css-society
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@gcu.edu.pk
ADMIN_PASSWORD=Admin@123456
CORS_ORIGIN=http://localhost:5173
```

### Running the Server

**Development Mode:**

```bash
npm start
# or with auto-reload
npm run dev
```

**Production Mode:**

```bash
NODE_ENV=production npm start
```

Server will start at: `http://localhost:5000`

## 📚 API Documentation

Full API documentation is available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

### Base URL

```
http://localhost:5000/api
```

### Available Endpoints

#### User Management (`/api/users`)

- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /profile` - Get current user profile
- `PUT /profile` - Update profile
- `POST /change-password` - Change password
- `DELETE /account` - Delete account
- `GET /all` - Get all users (Admin)
- `GET /:id` - Get user by ID
- `PUT /:id/deactivate` - Deactivate user (Admin)
- `PUT /:id/activate` - Activate user (Admin)

#### Events (`/api/events`)

- `GET /` - Get all events
- `GET /:id` - Get event details
- `POST /` - Create event (Admin)
- `PUT /:id` - Update event (Admin)
- `DELETE /:id` - Delete event (Admin)
- `POST /:id/register` - Register for event
- `DELETE /:id/unregister` - Unregister from event
- `GET /user/my-events` - Get user's events

#### Announcements (`/api/announcements`)

- `GET /` - Get all announcements
- `GET /:id` - Get announcement details
- `POST /` - Create announcement (Admin)
- `PUT /:id` - Update announcement (Admin)
- `DELETE /:id` - Delete announcement (Admin)
- `PATCH /:id/toggle-pin` - Pin/unpin announcement (Admin)
- `PATCH /:id/toggle-publish` - Publish/unpublish (Admin)

#### Team Members (`/api/team-members`)

- `GET /` - Get all team members
- `GET /active` - Get active members
- `GET /:id` - Get member details
- `POST /` - Create member (Admin)
- `PUT /:id` - Update member (Admin)
- `DELETE /:id` - Delete member (Admin)
- `PATCH /:id/deactivate` - Deactivate member (Admin)
- `PATCH /:id/activate` - Activate member (Admin)

## 🔐 Authentication

All protected endpoints require JWT token in header:

```
Authorization: Bearer <your_token_here>
```

### Getting a Token

1. Register:

```bash
POST /api/users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "fullName": "John Doe"
}
```

2. Login:

```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

Response includes `token` which should be used in Authorization header.

## 🔑 Default Admin Account

On first run, an admin account is automatically created:

- **Email:** `admin@gcu.edu.pk`
- **Password:** `Admin@123456`

⚠️ **Important:** Change the password immediately after first login!

Change password:

```bash
POST /api/users/change-password
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "oldPassword": "Admin@123456",
  "newPassword": "NewSecurePassword",
  "confirmPassword": "NewSecurePassword"
}
```

## 📊 Data Models

### User

```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (bcrypt hashed),
  fullName: String,
  role: 'admin' | 'user',
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Event

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  date: Date,
  location: String,
  category: 'workshop' | 'competition' | 'seminar' | 'hackathon' | 'networking' | 'other',
  image: String,
  maxParticipants: Number,
  registrations: [
    {
      userId: ObjectId (ref: User),
      registeredAt: Date
    }
  ],
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled',
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Announcement

```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  category: 'news' | 'update' | 'achievement' | 'urgent' | 'other',
  image: String,
  isPinned: Boolean,
  isPublished: Boolean,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### TeamMember

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  position: String,
  image: String,
  bio: String,
  phone: String,
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
    portfolio: String
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛡️ Security Features

- **Password Hashing:** Bcryptjs with salt rounds of 10
- **JWT Authentication:** Secure token-based auth with expiration
- **Input Validation:** All inputs validated using express-validator
- **Input Sanitization:** Protection against NoSQL injection
- **CORS:** Configurable cross-origin requests
- **Helmet:** Security headers
- **Error Handling:** No sensitive information in error messages

## 🧪 Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Pass123456","fullName":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gcu.edu.pk","password":"Admin@123456"}'

# Get Profile
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Import the API documentation or manually create requests
2. Set Authorization type to "Bearer Token"
3. Paste the JWT token in the token field
4. Make requests to API endpoints

### Using Thunder Client / REST Client

Add to your requests:

```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
Content-Type: application/json
```

## 🌍 Environment Setup

### Local Development (MongoDB)

1. Install MongoDB Community Edition
2. Start MongoDB service
3. Create database: `css-society`
4. Set `MONGODB_URI=mongodb://localhost:27017/css-society` in .env

### MongoDB Atlas (Cloud)

1. Create MongoDB Atlas account
2. Create a cluster
3. Get connection string
4. Set in .env: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/css-society`

## 📝 Logging & Debugging

Enable verbose logging:

```javascript
// In app.js or any controller
console.log("Debug info:", variable);
```

Check logs in terminal output or MongoDB Compass for data verification.

## 🚨 Common Issues

### MongoDB Connection Error

- Ensure MongoDB service is running
- Check connection string in .env
- Verify database exists

### JWT Errors

- Token expired: Login again to get new token
- Invalid token: Check token format in header
- Missing token: Add Authorization header

### Port Already in Use

Change PORT in .env or kill process using that port

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/introduction)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Push and create a Pull Request

## 📄 License

This project is licensed under the ISC License

## 👨‍💻 Support

For questions or issues:

- Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Review code comments
- Contact CSS Tech Team

---

**Made with ❤️ by CSS Tech Team**

_Last Updated: November 2025_
