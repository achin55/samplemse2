import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="home">
      <div className="home-hero">
        <h1>💰 Expense Manager</h1>
        <p className="hero-subtitle">Take control of your finances</p>
        <p className="hero-description">
          Manage your daily expenses easily and securely. Track your spending,
          categorize expenses, and stay on top of your finances.
        </p>
        
        {isAuthenticated ? (
          <Link to="/dashboard" className="cta-btn">
            Go to Dashboard
          </Link>
        ) : (
          <div className="cta-buttons">
            <Link to="/login" className="cta-btn login-btn">
              Login
            </Link>
            <Link to="/register" className="cta-btn register-btn">
              Register
            </Link>
          </div>
        )}
      </div>

      <div className="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Expenses</h3>
            <p>Add and organize your daily expenses with ease</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🏷️</div>
            <h3>Categorize</h3>
            <p>Organize expenses into categories like Food, Travel, Bills, etc.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Analytics</h3>
            <p>View detailed breakdowns and statistics of your spending</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Your data is encrypted and secured with JWT authentication</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
