# SETUP AND DEPLOYMENT GUIDE

## Project Overview

This is a complete MERN Stack application for Personal Expense Management. The project is divided into two main parts:
- **Backend**: Node.js/Express API with MongoDB
- **Frontend**: React single-page application

## Directory Structure

```
samplemse2/
├── backend/                          # Express/Node.js Backend
│   ├── config/db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Auth endpoints
│   │   └── expenseController.js     # Expense endpoints
│   ├── middleware/
│   │   ├── auth.js                  # JWT middleware
│   │   └── error.js                 # Error handling
│   ├── models/
│   │   ├── User.js                  # User model with bcrypt
│   │   └── Expense.js               # Expense model
│   ├── routes/
│   │   ├── auth.js                  # Auth routes
│   │   └── expense.js               # Expense routes
│   ├── server.js                    # Main server file
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/                        # React Frontend
│   ├── public/index.html
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   ├── pages/                   # Page components
│   │   ├── context/                 # State management
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   ├── package.json
│   ├── .gitignore
│   └── README.md
│
├── README.md                        # Main documentation
└── SETUP_GUIDE.md                  # This file
```

## Part 1: Backend Setup

### Step 1: Install Node.js and MongoDB

**Windows:**
1. Download Node.js from https://nodejs.org/
2. Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
3. Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

**Mac:**
```bash
brew install node
brew install mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install nodejs npm
sudo apt-get install mongodb
```

### Step 2: Navigate to Backend Directory

```bash
cd samplemse2/backend
```

### Step 3: Install Dependencies

```bash
npm install
```

This installs:
- express (web framework)
- mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- cors (cross-origin requests)
- dotenv (environment variables)
- validator (input validation)
- nodemon (dev only, auto-restart)

### Step 4: Create Environment File

Create `.env` file in backend directory:

```bash
# For Windows
copy .env.example .env

# For Mac/Linux
cp .env.example .env
```

Edit `.env` file and update values:

**For Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/expense_db
PORT=5000
JWT_SECRET=your_secure_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

**For MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/expense_db?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_secure_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

### Step 5: Start MongoDB

**Windows (if installed locally):**
```bash
mongod
```

**Using MongoDB Atlas:**
- No need to start locally, connection string handles it

**Check MongoDB Status:**
```bash
# Connect to MongoDB shell (local)
mongosh
# or
mongo

# Check collections
show databases
```

### Step 6: Start Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Expected output:
```
Server running on port 5000
MongoDB Connected: localhost
```

### Step 7: Test Backend

Use Postman or cURL to test:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "password":"password123",
    "passwordConfirm":"password123"
  }'
```

## Part 2: Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd samplemse2/frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- react (UI library)
- react-router-dom (routing)
- axios (HTTP client)
- react-scripts (build tools)

### Step 3: Start Frontend Development Server

```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

Expected output:
```
Compiled successfully!

You can now view expense-management-frontend in the browser.

  http://localhost:3000
```

### Step 4: Verify Backend Connection

The frontend will automatically connect to the backend on `http://localhost:5000`

Check browser console for any errors (F12 → Console tab)

## Part 3: Complete Application Flow

### Running Both Frontend and Backend

**Option 1: Two Terminal Windows**

Terminal 1 (Backend):
```bash
cd samplemse2/backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd samplemse2/frontend
npm start
```

**Option 2: Using concurrently (from root)**

1. Install concurrently globally:
```bash
npm install -g concurrently
```

2. From root directory, run both:
```bash
concurrently "cd backend && npm run dev" "cd frontend && npm start"
```

## Testing the Application

### 1. Create a Test Account

1. Go to http://localhost:3000
2. Click "Register"
3. Fill in details:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm: password123
4. Click Register

### 2. Test Adding Expense

1. On Dashboard, click "+ Add Expense"
2. Fill in:
   - Title: Lunch
   - Amount: 500
   - Category: Food
   - Date: Today
3. Click "Add Expense"

### 3. Test Filtering

1. Scroll to "Filter by Category"
2. Click different category buttons
3. Click "All" to see all expenses

### 4. Test Edit/Delete

1. Click "Edit" on an expense
2. Modify and click "Save"
3. Click "Delete" to remove

### 5. View Statistics

1. Scroll down to see "Category Breakdown"
2. View amount and percentage per category

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  createdAt: Date,
  updatedAt: Date
}
```

### Expense Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  title: String,
  amount: Number,
  category: String,
  date: Date,
  description: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## API Authentication

1. User logs in and receives JWT token
2. Token stored in localStorage
3. Token sent in Authorization header for protected routes:
```
Authorization: Bearer <token>
```
4. Backend verifies token and processes request
5. Token expires in 7 days

## Troubleshooting

### Issue: Backend won't start
**Solution:**
- Check if port 5000 is already in use
- Kill process on port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -i :5000
  kill -9 <PID>
  ```

### Issue: MongoDB connection error
**Solution:**
- Ensure MongoDB is running (mongod)
- Check connection string in .env
- For Atlas, check IP whitelist in security settings

### Issue: Frontend can't connect to backend
**Solution:**
- Ensure backend is running on port 5000
- Check proxy in frontend/package.json
- Check browser console for CORS errors
- Verify no firewall blocking port 5000

### Issue: CORS error
**Solution:**
- Backend already has CORS enabled
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: JWT token invalid
**Solution:**
- Clear localStorage and log in again
- Check JWT_SECRET in .env matches both frontend and backend
- Token expires after 7 days, log in again

## Production Deployment

### Backend Deployment (Heroku)

1. Install Heroku CLI from https://devcenter.heroku.com/articles/heroku-cli
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set NODE_ENV=production
   ```
5. Deploy:
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Vercel/Netlify)

**Vercel:**
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variable: `REACT_APP_API_URL=your_backend_url`
4. Deploy

**Netlify:**
1. Build frontend: `npm run build`
2. Deploy build folder to Netlify
3. Set redirects: Create `_redirects` file with:
   ```
   /* /index.html 200
   ```

## Performance Optimization

1. **Backend**:
   - Database indexing on userId
   - JWT token caching
   - Connection pooling

2. **Frontend**:
   - Code splitting with React.lazy()
   - Component memoization
   - Efficient state management

## Security Checklist

- [x] Passwords hashed with bcryptjs
- [x] JWT authentication implemented
- [x] Protected routes with middleware
- [x] Input validation on server
- [x] CORS enabled
- [x] Error messages don't expose sensitive data
- [x] Environment variables for secrets
- [x] SQL injection prevented (using Mongoose)

## Additional Commands

### Backend
```bash
npm start              # Production
npm run dev           # Development with nodemon
npm install           # Install dependencies
```

### Frontend
```bash
npm start             # Development
npm run build         # Production build
npm test              # Run tests
npm install           # Install dependencies
```

## File Sizes

After installation:
- Backend node_modules: ~200MB
- Frontend node_modules: ~400MB
- Backend build: ~5MB
- Frontend build: ~150KB (gzipped)

## Next Steps

1. Customize the styling (colors, fonts, layout)
2. Add more expense categories
3. Implement additional features (budget, notifications)
4. Add unit tests
5. Set up CI/CD pipeline
6. Deploy to production

## Support

For issues or questions:
1. Check README.md files in backend/ and frontend/
2. Review error messages in console
3. Check network tab in browser DevTools
4. Verify all environment variables are set

## Summary

You now have a fully functional MERN Stack Expense Management System with:
- ✅ User registration and authentication
- ✅ Secure password storage with bcrypt
- ✅ JWT token-based authorization
- ✅ Complete CRUD operations for expenses
- ✅ Category-based filtering
- ✅ Expense statistics
- ✅ Responsive UI
- ✅ Error handling
- ✅ Production-ready code

Happy Coding! 🚀
