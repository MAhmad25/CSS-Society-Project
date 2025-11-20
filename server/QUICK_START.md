#!/usr/bin/env node

# 🚀 CSS Society Backend - Quick Start Guide

## Step 1: Install MongoDB (Choose One)

### Option A: Local MongoDB

```bash
# Windows: Download from https://www.mongodb.com/try/download/community
# macOS: brew install mongodb-community
# Linux: Follow https://docs.mongodb.com/manual/installation/

# Start MongoDB service
# Windows: mongod
# macOS/Linux: brew services start mongodb-community
```

### Option B: MongoDB Atlas (Cloud)

```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Copy connection string
5. Paste in .env as MONGODB_URI
```

## Step 2: Setup Environment

```bash
cd server
cp .env.example .env  # Copy example (or edit existing .env)
```

Edit `.env`:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/css-society
JWT_SECRET=change_this_to_a_secure_random_key
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@gcu.edu.pk
ADMIN_PASSWORD=Admin@123456
CORS_ORIGIN=http://localhost:5173
```

## Step 3: Install Dependencies

```bash
cd server
npm install
```

## Step 4: Start the Server

```bash
npm start
```

You should see:

```
==================================================
🚀 CSS Society API Server Started
==================================================
📍 Server Running on: http://localhost:5000
🌍 Environment: development
📚 API Base URL: http://localhost:5000/api
==================================================

✅ MongoDB connected successfully
✅ Admin user created successfully
```

## Step 5: Test the API

### Using cURL:

**Login as Admin:**

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gcu.edu.pk","password":"Admin@123456"}'
```

You'll get a response like:

```json
{
      "status": "success",
      "message": "Login successful",
      "data": {
            "user": { "id": "...", "email": "admin@gcu.edu.pk", "role": "admin" },
            "token": "eyJhbGciOiJIUzI1NiIs..."
      }
}
```

**Save the token and use it for other requests:**

```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman:

1. Open Postman
2. Create a new request
3. Set Method: POST
4. URL: `http://localhost:5000/api/users/login`
5. Go to Body → Raw → JSON
6. Paste:

```json
{
      "email": "admin@gcu.edu.pk",
      "password": "Admin@123456"
}
```

7. Click Send
8. Copy the token from response
9. For next requests, add Authorization header with Bearer token

## 📚 Common Operations

### Create an Event (Admin)

```bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Tech Taakra 2025",
    "description": "Annual programming competition for all students",
    "date": "2025-03-15T10:00:00Z",
    "location": "GC University Lahore",
    "category": "competition",
    "maxParticipants": 100
  }'
```

### Register for Event

```bash
curl -X POST http://localhost:5000/api/events/EVENT_ID/register \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Announcement (Admin)

```bash
curl -X POST http://localhost:5000/api/announcements \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Registration Open",
    "content": "Event registrations are now open!",
    "category": "news",
    "isPinned": true,
    "isPublished": true
  }'
```

### Get All Events

```bash
curl http://localhost:5000/api/events
```

### Get All Announcements

```bash
curl http://localhost:5000/api/announcements
```

## 🔑 Important Commands

```bash
# Start server
npm start

# Stop server
Ctrl + C

# Check MongoDB connection
# If you see "✅ MongoDB connected" - all good!

# Reset database (delete all data)
# 1. Stop the server
# 2. Delete the database in MongoDB
# 3. Restart server
# Admin user will be recreated
```

## 🐛 Troubleshooting

### MongoDB Connection Error

```
❌ MongoDB connection error: connect ECONNREFUSED
```

**Solution:**

- Make sure MongoDB is running
- Check MONGODB_URI in .env
- For local: `mongodb://localhost:27017/css-society`
- For Atlas: Use connection string from dashboard

### Port Already in Use

```
Error: listen EADDRINUSE :::5000
```

**Solution:**

- Change PORT in .env to different number (e.g., 5001)
- Or kill process: `netstat -ano | findstr :5000`

### JWT Token Errors

```
Invalid or expired token
```

**Solution:**

- Login again to get new token
- Check Authorization header format: `Bearer TOKEN`
- Tokens expire after 7 days (configurable in .env)

## 📖 Full Documentation

- **API_DOCUMENTATION.md** - Complete API reference
- **README.md** - Detailed setup and features
- **SETUP_SUMMARY.md** - What was implemented

## 🎯 Default Credentials

```
Admin Email: admin@gcu.edu.pk
Admin Password: Admin@123456
```

⚠️ Change these after first login!

## ✅ Checklist

- [ ] MongoDB installed and running
- [ ] .env file configured
- [ ] Dependencies installed (`npm install`)
- [ ] Server running (`npm start`)
- [ ] Can login to admin account
- [ ] Can access API endpoints
- [ ] Can create events/announcements (Admin)
- [ ] Can register for events (User)

## 🚀 You're Ready!

Your CSS Society backend is now:

- ✅ Connected to MongoDB
- ✅ Running Express server
- ✅ Admin account created
- ✅ All APIs ready to use
- ✅ Fully documented

Start building! 💙

---

**Need Help?**

- Check API_DOCUMENTATION.md for endpoint details
- Review error messages in terminal
- Ensure MongoDB is running
- Verify .env variables
- Check network connectivity

**Made with ❤️ by CSS Tech Team**
