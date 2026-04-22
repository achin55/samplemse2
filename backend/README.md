# Backend - Personal Expense Management System

Backend API built with Node.js, Express, and MongoDB for the expense management application.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/expense_db
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

3. Start MongoDB (if running locally):
```bash
mongod
```

4. Run the server:
```bash
npm start          # Production
npm run dev        # Development with nodemon
```

The server will run on `http://localhost:5000`

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection configuration
├── controllers/
│   ├── authController.js  # Authentication logic (register, login)
│   └── expenseController.js # Expense CRUD operations
├── middleware/
│   ├── auth.js            # JWT verification middleware
│   └── error.js           # Global error handling
├── models/
│   ├── User.js            # User schema with password hashing
│   └── Expense.js         # Expense schema
├── routes/
│   ├── auth.js            # Auth endpoints
│   └── expense.js         # Expense endpoints
├── server.js              # Main application file
├── package.json
└── .env.example
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user (protected)

### Expenses
- `POST /api/expenses` - Create expense (protected)
- `GET /api/expenses` - Get all user expenses (protected)
- `GET /api/expenses/:id` - Get single expense (protected)
- `PUT /api/expenses/:id` - Update expense (protected)
- `DELETE /api/expenses/:id` - Delete expense (protected)
- `GET /api/expenses/stats/category` - Get category statistics (protected)

## Environment Variables

Create a `.env` file with the following variables:

```
MONGODB_URI=mongodb://localhost:27017/expense_db
PORT=5000
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development
```

## Database Connection

- **Local MongoDB**: `mongodb://localhost:27017/expense_db`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/expense_db`

## Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Expense Schema
```javascript
{
  userId: ObjectId (reference to User),
  title: String (required),
  amount: Number (required),
  category: String (enum: Food, Travel, Bills, Entertainment, Health, Education, Shopping, Other),
  date: Date (required),
  description: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## Middleware

### Auth Middleware
- Verifies JWT tokens from Authorization header
- Attaches userId to request object
- Returns 401 if token is invalid or missing

### Error Middleware
- Handles all application errors
- Converts Mongoose errors to user-friendly messages
- Handles duplicate key errors
- Handles validation errors

## Security

- Passwords hashed with bcryptjs (salt rounds: 10)
- JWT tokens with 7-day expiry
- Protected routes verify authentication
- Input validation on all endpoints
- CORS enabled for frontend communication

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **validator**: Input validation

## Dev Dependencies

- **nodemon**: Auto-restart on file changes

## Running in Production

1. Set `NODE_ENV=production` in .env
2. Use process manager like PM2:
```bash
npm install -g pm2
pm2 start server.js --name "expense-api"
pm2 save
pm2 startup
```

## Logging

The application logs:
- Server startup on the configured port
- MongoDB connection success/failure
- All errors with stack traces
- Request validation errors

## Testing

To test API endpoints, use tools like:
- Postman
- Insomnia
- cURL

Example:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"pass123","passwordConfirm":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'

# Add Expense
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"Lunch","amount":500,"category":"Food"}'
```
