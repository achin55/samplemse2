import React, { useContext, useState, useEffect } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import './ExpenseStats.css';

const ExpenseStats = () => {
  const { expenses } = useContext(ExpenseContext);
  const [stats, setStats] = useState({});

  useEffect(() => {
    calculateStats();
  }, [expenses]);

  const calculateStats = () => {
    const categorized = {
      'Food': 0,
      'Travel': 0,
      'Bills': 0,
      'Entertainment': 0,
      'Health': 0,
      'Education': 0,
      'Shopping': 0,
      'Other': 0
    };

    expenses.forEach(expense => {
      if (categorized.hasOwnProperty(expense.category)) {
        categorized[expense.category] += expense.amount;
      }
    });

    setStats(categorized);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food': '#e74c3c',
      'Travel': '#3498db',
      'Bills': '#9b59b6',
      'Entertainment': '#f39c12',
      'Health': '#27ae60',
      'Education': '#16a085',
      'Shopping': '#c0392b',
      'Other': '#34495e'
    };
    return colors[category] || '#95a5a6';
  };

  const sortedCategories = Object.entries(stats)
    .filter(([_, amount]) => amount > 0)
    .sort(([_, a], [__, b]) => b - a);

  return (
    <div className="expense-stats">
      <h3>Category Breakdown</h3>
      {sortedCategories.length === 0 ? (
        <p className="no-stats">No expenses to display</p>
      ) : (
        <div className="stats-grid">
          {sortedCategories.map(([category, amount]) => (
            <div key={category} className="stat-item">
              <div className="stat-header">
                <span 
                  className="stat-category"
                  style={{ backgroundColor: getCategoryColor(category) }}
                >
                  {category}
                </span>
              </div>
              <div className="stat-amount">₹{amount.toFixed(2)}</div>
              <div className="stat-percentage">
                {Math.round((amount / Object.values(stats).reduce((a, b) => a + b, 0)) * 100)}%
              </div>
              <div className="stat-bar">
                <div 
                  className="stat-bar-fill"
                  style={{
                    width: `${(amount / Object.values(stats).reduce((a, b) => a + b, 0)) * 100}%`,
                    backgroundColor: getCategoryColor(category)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseStats;
