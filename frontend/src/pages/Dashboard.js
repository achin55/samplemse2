import React, { useContext, useState, useEffect } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseStats from '../components/ExpenseStats';
import './Dashboard.css';

const Dashboard = () => {
  const { expenses, loading, fetchExpenses, getTotalAmount } = useContext(ExpenseContext);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    if (category) {
      fetchExpenses(category);
    } else {
      fetchExpenses();
    }
  };

  const categories = ['Food', 'Travel', 'Bills', 'Entertainment', 'Health', 'Education', 'Shopping', 'Other'];
  const totalAmount = getTotalAmount();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Expense Dashboard</h1>
        <button 
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Add Expense'}
        </button>
      </div>

      {showForm && <ExpenseForm onClose={() => setShowForm(false)} />}

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p className="stat-value">₹{totalAmount.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Items</h3>
          <p className="stat-value">{expenses.length}</p>
        </div>
      </div>

      <ExpenseStats />

      <div className="dashboard-content">
        <div className="filter-section">
          <h3>Filter by Category</h3>
          <div className="category-buttons">
            <button
              className={`category-btn ${selectedCategory === '' ? 'active' : ''}`}
              onClick={() => handleFilterChange('')}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleFilterChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading expenses...</div>
        ) : expenses.length === 0 ? (
          <div className="empty-state">
            <p>No expenses yet. Start adding your expenses!</p>
          </div>
        ) : (
          <ExpenseList expenses={selectedCategory ? expenses.filter(e => e.category === selectedCategory) : expenses} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
