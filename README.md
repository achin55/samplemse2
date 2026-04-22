# Personal Expense Management System - MERN Stack

A full-stack application for managing personal expenses with user authentication, secure data storage, and comprehensive analytics.

## Project Structure

```
samplemse2/
├── backend/                 # Node.js/Express backend
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── expenseController.js # Expense management logic
│   ├── middleware/
│   │   ├── auth.js         # JWT verification middleware
│   │   └── error.js        # Error handling middleware
│   ├── models/
│   │   ├── User.js         # User schema
│   │   └── Expense.js      # Expense schema
│   ├── routes/
│   │   ├── auth.js         # Auth routes
│   │   └── expense.js      # Expense routes
│   ├── .env.example        # Environment variables template
│   ├── server.js           # Main server file
│   └── package.json
│
└── frontend/               # React frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── PrivateRoute.js
    │   │   ├── ExpenseForm.js
    │   │   ├── ExpenseList.js
    │   │   └── ExpenseStats.js
    │   ├── context/
    │   │   ├── AuthContext.js   # Auth state management
    │   │   └── ExpenseContext.js # Expense state management
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   └── Dashboard.js
    │   ├── App.js
    │   ├── index.js
    │   └── App.css
    └── package.json
```

## Features

### Part A: Backend Development
- **User Authentication**: Secure registration and login with bcrypt password hashing
- **JWT Token**: Token-based authentication for protected routes
- **MongoDB Schemas**:
  - User: name, email (unique), password (hashed)
  - Expense: userId, title, amount, category, date, description
- **REST APIs**:
  - POST `/api/auth/register` - Register new user
  - POST `/api/auth/login` - User login with JWT token
  - GET `/api/auth/me` - Get current user info
  - POST `/api/expenses` - Add new expense (protected)
  - GET `/api/expenses` - Get all user expenses (protected)
  - PUT `/api/expenses/:id` - Update expense (protected)
  - DELETE `/api/expenses/:id` - Delete expense (protected)
  - GET `/api/expenses/stats/category` - Get category stats (protected)

### Part B: Authentication & Middleware
- JWT-based authentication with 7-day token expiry
- Auth middleware that:
  - Verifies JWT tokens
  - Attaches user info to request
  - Protects expense routes
- Error handling middleware for graceful error responses

### Part C: Frontend Development
- **Pages**:
  - Home page with features overview
  - Register page with validation
  - Login page with authentication
  - Dashboard with expense management
- **Components**:
  - Navbar with user info and navigation
  - Expense form for adding new expenses
  - Expense list with edit/delete functionality
  - Category statistics display
  - Protected routes for authenticated users
- **State Management**:
  - AuthContext for user authentication
  - ExpenseContext for expense management
  - JWT token stored in localStorage

### Part D: Functionality & Features
- ✅ User registration and login
- ✅ Add new expenses with details (title, amount, category, date)
- ✅ View all expenses in a table format
- ✅ Edit existing expenses
- ✅ Delete expenses
- ✅ Filter expenses by category
- ✅ View total expenses
- ✅ Category-wise expense breakdown
- ✅ Responsive design

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
MONGODB_URI=mongodb://localhost:27017/expense_db
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Start MongoDB:
```bash
# For Windows with MongoDB installed locally
mongod
```

5. Start the backend server:
```bash
npm start          # Production mode
npm run dev        # Development mode with nodemon
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (Protected) |

### Expenses
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/expenses` | Add new expense (Protected) |
| GET | `/api/expenses` | Get all expenses (Protected) |
| GET | `/api/expenses/:id` | Get single expense (Protected) |
| PUT | `/api/expenses/:id` | Update expense (Protected) |
| DELETE | `/api/expenses/:id` | Delete expense (Protected) |
| GET | `/api/expenses/stats/category` | Get category stats (Protected) |

## Request/Response Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Add Expense
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "Lunch at restaurant",
    "amount": 500,
    "category": "Food",
    "date": "2024-04-23",
    "description": "Lunch with friends"
  }'
```

### Get Expenses
```bash
curl -X GET http://localhost:5000/api/expenses \
  -H "Authorization: Bearer <token>"
```

### Filter by Category
```bash
curl -X GET "http://localhost:5000/api/expenses?category=Food" \
  -H "Authorization: Bearer <token>"
```

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - JavaScript library for UI
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

## Security Features

1. **Password Security**: Passwords hashed with bcryptjs (salt rounds: 10)
2. **JWT Authentication**: Tokens with 7-day expiry
3. **Protected Routes**: Middleware validates all protected endpoints
4. **Input Validation**: Server-side validation for all inputs
5. **CORS Enabled**: Secure cross-origin requests
6. **Environment Variables**: Sensitive data in .env files

## Usage Guide

### Register a New User
1. Click "Register" on the home page
2. Enter name, email, and password
3. Confirm password and submit
4. You'll be redirected to the dashboard

### Login
1. Click "Login" on the home page
2. Enter your email and password
3. Click "Login" button
4. You'll be redirected to the dashboard

### Add an Expense
1. Click "+ Add Expense" button on the dashboard
2. Fill in the form:
   - Title: Name of the expense
   - Amount: Cost in rupees
   - Category: Select from dropdown
   - Date: Select date
   - Description: Optional notes
3. Click "Add Expense"

### View Expenses
- All expenses are displayed in a table on the dashboard
- Click on any expense row to see more details
- Use the category filter buttons to filter expenses

### Edit an Expense
1. Find the expense in the list
2. Click "Edit" button
3. Modify the details
4. Click "Save" to save changes

### Delete an Expense
1. Find the expense in the list
2. Click "Delete" button
3. Confirm the deletion

### Filter by Category
1. Scroll down to "Filter by Category" section
2. Click on a category button to filter
3. Click "All" to see all expenses

## Error Handling

The application includes comprehensive error handling:
- User-friendly error messages
- Server-side validation
- Client-side validation
- Graceful error responses
- Try-catch blocks in all async operations

## Performance Optimizations

1. **Database Indexing**: Indexed userId in Expense collection
2. **Lazy Loading**: Components load data only when needed
3. **Context Optimization**: Memoized callbacks to prevent unnecessary re-renders
4. **Request Caching**: Expense list cached in context state

## Future Enhancements

1. Expense export to CSV/PDF
2. Monthly/yearly budget planning
3. Email notifications for high spending
4. Mobile app version
5. Data visualization with charts
6. Multiple currency support
7. Cloud storage integration
8. Two-factor authentication
9. Expense sharing with other users
10. Recurring expense automation

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env file
- Verify MongoDB credentials if using Atlas

### Backend Port Already in Use
```bash
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend Not Connecting to Backend
- Verify backend is running on port 5000
- Check proxy in frontend package.json
- Clear browser cache and local storage

### CORS Error
- Ensure CORS middleware is enabled in Express
- Check frontend URL in CORS configuration

## License

MIT

## Author

Created as a Personal Expense Management System for the MERN Stack project.
#   s a m p l e m s e 2  
 