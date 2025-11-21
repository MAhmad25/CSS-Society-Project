# QUICK ACTION GUIDE - Vercel Deployment CORS Fix

## 🚀 What You Need to Do RIGHT NOW

### Step 1: Set Environment Variables in Vercel (Backend)

1. Go to: https://vercel.com/dashboard
2. Select your backend project: `css-society-project-ty9c`
3. Click **Settings** → **Environment Variables**
4. Add these variables:

```
NODE_ENV = production
PORT = 3000
MONGODB_URI = mongodb+srv://ahmadlatifshadow:RPW14Y7M2mdqttGn@cluster0.nv26xkw.mongodb.net/css-society
JWT_SECRET = your_super_secret_jwt_key_change_this_in_production_12345678901234567890
JWT_EXPIRE = 7d
ADMIN_EMAIL = admin@gcu.edu.pk
ADMIN_PASSWORD = Admin@123456
CORS_ORIGIN = https://css-society-project-q6pq.vercel.app
```

Click **Save** (project will redeploy)

### Step 2: Set Environment Variables in Vercel (Frontend)

1. Select your frontend project: `css-society-project-q6pq`
2. Click **Settings** → **Environment Variables**
3. Add this variable:

```
VITE_API_BASE_URL = https://css-society-project-ty9c.vercel.app/api
```

Click **Save** (project will redeploy)

### Step 3: Push Your Code

```bash
# In your project root
git add .
git commit -m "Fix CORS and API configuration for Vercel"
git push origin main
```

Vercel will automatically redeploy both projects.

### Step 4: Test

1. Go to https://css-society-project-q6pq.vercel.app/
2. Open browser console (F12)
3. Try to log in
4. Check console - NO CORS ERRORS should appear! ✅

---

## 📝 What Changed

### Backend Files

- ✅ `/server/.env` - Added CORS_ORIGIN
- ✅ `/server/.env.production` - Created
- ✅ `/server/app.js` - Fixed app.listen()
- ✅ `/server/vercel.json` - Fixed entry point

### Frontend Files

- ✅ `/client/src/services/api.js` - Use env variable
- ✅ `/client/.env` - Created
- ✅ `/client/.env.production` - Created

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Backend health check works: https://css-society-project-ty9c.vercel.app/api/health
- [ ] Frontend loads: https://css-society-project-q6pq.vercel.app/
- [ ] Can log in as admin
- [ ] Can create events (no CORS errors in console)
- [ ] Events appear immediately after creation
- [ ] Can create announcements
- [ ] Can create team members

---

## 🔧 Environment Variables Reference

| Variable            | Value                                             | Used In  |
| ------------------- | ------------------------------------------------- | -------- |
| `CORS_ORIGIN`       | `https://css-society-project-q6pq.vercel.app`     | Backend  |
| `VITE_API_BASE_URL` | `https://css-society-project-ty9c.vercel.app/api` | Frontend |
| `MONGODB_URI`       | Your connection string                            | Backend  |
| `JWT_SECRET`        | Your secret key                                   | Backend  |
| `NODE_ENV`          | `production`                                      | Backend  |
| `PORT`              | `3000`                                            | Backend  |

---

## 🎯 The Key Fix

**OLD (Broken):**

```
Frontend → https://...ty9c.../ ❌ CORS ERROR!
```

**NEW (Working):**

```
Frontend → https://...ty9c.../api ✅ CORS OK!
```

The `/api` prefix is crucial!

---

## 💬 If You Need Help

1. **CORS still failing?** → Check CORS_ORIGIN env var is set
2. **API returning 404?** → Check VITE_API_BASE_URL has `/api` suffix
3. **Build errors?** → Check Vercel logs in dashboard
4. **Not sure?** → Read `CORS_AND_DEPLOYMENT_FIX.md`

---

## 📚 Documentation Files

- `CORS_AND_DEPLOYMENT_FIX.md` - Detailed explanation
- `DEPLOYMENT_VISUAL_GUIDE.md` - Visual diagrams
- `VERCEL_DEPLOYMENT_GUIDE.md` - Complete guide

---

**You're ready to deploy! 🚀**
