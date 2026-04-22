import React, { useContext, useState } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import './ExpenseList.css';

const ExpenseList = ({ expenses }) => {
  const { deleteExpense, updateExpense } = useContext(ExpenseContext);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (expense) => {
    setEditingId(expense._id);
    setEditData({ ...expense });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    const result = await updateExpense(editingId, {
      title: editData.title,
      amount: editData.amount,
      category: editData.category,
      date: editData.date,
      description: editData.description
    });
    if (result.success) {
      setEditingId(null);
      setEditData(null);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
    }
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="expense-list">
      <h3>Your Expenses</h3>
      <div className="expense-table-container">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense._id} className={editingId === expense._id ? 'editing' : ''}>
                {editingId === expense._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      />
                    </td>
                    <td>
                      <select
                        value={editData.category}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                      >
                        {['Food', 'Travel', 'Bills', 'Entertainment', 'Health', 'Education', 'Shopping', 'Other'].map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editData.amount}
                        onChange={(e) => setEditData({ ...editData, amount: parseFloat(e.target.value) })}
                        step="0.01"
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={editData.date.split('T')[0]}
                        onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                      />
                    </td>
                    <td className="actions">
                      <button 
                        className="save-btn"
                        onClick={handleSaveEdit}
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button 
                        className="cancel-btn"
                        onClick={handleCancelEdit}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{expense.title}</td>
                    <td>
                      <span 
                        className="category-badge"
                        style={{ backgroundColor: getCategoryColor(expense.category) }}
                      >
                        {expense.category}
                      </span>
                    </td>
                    <td className="amount">₹{expense.amount.toFixed(2)}</td>
                    <td>{formatDate(expense.date)}</td>
                    <td className="actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(expense)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(expense._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
