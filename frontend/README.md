# Frontend - Personal Expense Management System

React frontend for the expense management application with user authentication and dashboard.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open on `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Navbar.js       # Navigation bar
│   │   ├── PrivateRoute.js # Protected route wrapper
│   │   ├── ExpenseForm.js  # Add/edit expense form
│   │   ├── ExpenseList.js  # Display expenses in table
│   │   ├── ExpenseStats.js # Category breakdown stats
│   │   └── *.css           # Component styles
│   ├── context/            # State management
│   │   ├── AuthContext.js  # Authentication state
│   │   └── ExpenseContext.js # Expense state
│   ├── pages/              # Page components
│   │   ├── Home.js         # Landing page
│   │   ├── Login.js        # Login page
│   │   ├── Register.js     # Registration page
│   │   ├── Dashboard.js    # Main expense dashboard
│   │   └── *.css           # Page styles
│   ├── App.js              # Main app component with routing
│   ├── index.js            # Application entry point
│   └── App.css             # Global styles
├── package.json
└── .gitignore
```

## Features

### Pages
1. **Home Page** - Landing page with features overview
2. **Register Page** - User registration with validation
3. **Login Page** - User authentication
4. **Dashboard** - Main expense management interface

### Components
1. **Navbar** - Navigation and user info display
2. **ExpenseForm** - Modal form to add/edit expenses
3. **ExpenseList** - Table view of all expenses with edit/delete
4. **ExpenseStats** - Category-wise expense breakdown
5. **PrivateRoute** - Protected routes wrapper

## State Management

### AuthContext
Manages user authentication state:
- User data
- JWT token
- Login/register/logout functions
- Authentication status

### ExpenseContext
Manages expense data:
- Expense list
- CRUD operations
- Filtering
- Total calculations
- Category breakdown

## Authentication Flow

1. User registers with name, email, password
2. Password validation and confirmation
3. Server returns JWT token on successful registration
4. Token stored in localStorage
5. Token attached to all API requests
6. User redirected to dashboard
7. Logout clears token and redirects to login

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner.

### `npm eject`
Exposes all configurations (one-way operation).

## Installation

1. Ensure backend is running on port 5000
2. Install dependencies: `npm install`
3. Start frontend: `npm start`

## Environment Setup

The frontend assumes the backend is running on:
```
http://localhost:5000
```

This is configured in `package.json` as a proxy:
```json
"proxy": "http://localhost:5000"
```

## API Communication

All API calls go through axios with:
- Base URL from proxy or REACT_APP_API_URL
- JWT token in Authorization header
- Automatic error handling
- Response/request interceptors

## Styling

- **Global Styles**: `src/App.css`
- **Component Styles**: Separate CSS files for each component
- **Responsive Design**: Mobile-first approach with media queries
- **Color Scheme**:
  - Primary: #667eea (purple)
  - Secondary: #764ba2 (darker purple)
  - Success: #27ae60 (green)
  - Danger: #e74c3c (red)

## Form Validation

### Register Form
- Name: Required, max 100 characters
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Password confirmation: Must match password

### Login Form
- Email: Required, valid email format
- Password: Required

### Expense Form
- Title: Required, max 100 characters
- Amount: Required, positive number
- Category: Required, select from predefined list
- Date: Optional, defaults to today
- Description: Optional, max 500 characters

## Routing

| Route | Component | Protected |
|-------|-----------|-----------|
| `/` | Home | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/dashboard` | Dashboard | Yes |

## User Flow

1. **New User**:
   - Home → Register → Enter Details → Dashboard

2. **Existing User**:
   - Home → Login → Enter Credentials → Dashboard

3. **In Dashboard**:
   - Add Expense → View List → Edit/Delete → Filter by Category

4. **Logout**:
   - Navbar Logout Button → Login Page

## Key Features

1. **Add Expense**: Modal form with all required fields
2. **View Expenses**: Table with sorting and filtering
3. **Edit Expense**: Inline editing in table
4. **Delete Expense**: With confirmation dialog
5. **Filter**: By category with "All" option
6. **Statistics**: Category breakdown with percentages
7. **Total Tracking**: Running total of all expenses
8. **Responsive**: Works on desktop, tablet, and mobile

## Error Handling

- Network error messages
- Form validation errors
- Authentication errors
- API error responses
- User-friendly error displays

## Performance Optimizations

1. Context API for state management
2. Memoized callbacks to prevent re-renders
3. Lazy loading of data
4. Efficient list rendering
5. CSS optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- **react**: UI library
- **react-dom**: React DOM rendering
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **react-scripts**: Create React App build scripts

## Development

### Hot Reloading
Changes to files automatically refresh the browser.

### Browser DevTools
React Developer Tools extension recommended for debugging.

### Debugging
- Console logs for debugging
- React DevTools for component inspection
- Network tab for API calls

## Deployment

### Building for Production
```bash
npm run build
```

### Deployment Options
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Heroku

## Troubleshooting

### Backend not connecting
- Verify backend is running on port 5000
- Check proxy setting in package.json
- Clear browser cache

### Authentication issues
- Check localStorage for JWT token
- Verify token hasn't expired
- Try logging out and logging back in

### Styling issues
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check CSS file paths

## Future Enhancements

1. Dark mode
2. Export to CSV/PDF
3. Monthly budget planning
4. Charts and graphs
5. Email notifications
6. Multi-currency support
7. Recurring expenses
8. Expense sharing
9. Mobile app
10. PWA features
