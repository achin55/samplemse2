# QUICK START GUIDE

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js installed (https://nodejs.org/)
- MongoDB installed or Atlas account (https://www.mongodb.com/)

### Terminal 1: Start Backend

```bash
cd samplemse2/backend

# Install dependencies
npm install

# Create .env file with:
# MONGODB_URI=mongodb://localhost:27017/expense_db
# PORT=5000
# JWT_SECRET=your_secret_key

# Start server
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB Connected: localhost
```

### Terminal 2: Start Frontend

```bash
cd samplemse2/frontend

# Install dependencies
npm install

# Start React app
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view expense-management-frontend in the browser.
http://localhost:3000
```

## 📝 Test the App (1 minute)

1. **Open Browser:** http://localhost:3000

2. **Register:**
   - Click "Register"
   - Enter: Name, Email, Password
   - Submit

3. **Add Expense:**
   - Click "+ Add Expense"
   - Fill: Title, Amount, Category
   - Submit

4. **View & Filter:**
   - See all expenses in table
   - Click category buttons to filter
   - View total and statistics

## 📁 Project Files Location

```
c:\Users\achin\OneDrive\Documents\samplemse2\
├── backend/          # Backend API
├── frontend/         # React app
├── README.md         # Full documentation
├── SETUP_GUIDE.md    # Detailed setup
└── PROJECT_SUMMARY.md # What's included
```

## ⚙️ Environment Setup

**Backend .env file:**
```
MONGODB_URI=mongodb://localhost:27017/expense_db
PORT=5000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

**Frontend .env (optional):**
Backend proxy already configured in package.json

## 🔑 Key Commands

**Backend:**
```bash
npm run dev   # Development
npm start     # Production
```

**Frontend:**
```bash
npm start     # Development
npm build     # Production build
```

## 🎯 Features at a Glance

- ✅ User registration & login
- ✅ Add/edit/delete expenses
- ✅ Filter by category
- ✅ View statistics
- ✅ Secure authentication (JWT)
- ✅ Responsive design

## ❌ Troubleshooting

**Backend won't start:**
- MongoDB not running: Start `mongod`
- Port 5000 in use: Change PORT in .env

**Frontend can't connect:**
- Backend not running: Check terminal 1
- Clear browser cache: Ctrl+Shift+Delete

**Database error:**
- Check .env MONGODB_URI
- For Atlas: Whitelist your IP

## 📚 Full Documentation

- Main Guide: `README.md`
- Setup Details: `SETUP_GUIDE.md`
- Project Info: `PROJECT_SUMMARY.md`
- Backend Guide: `backend/README.md`
- Frontend Guide: `frontend/README.md`

## 🎉 You're All Set!

The app is now running. Try:
1. Creating an account
2. Adding some expenses
3. Filtering by category
4. Viewing statistics

Enjoy managing your expenses! 💰
