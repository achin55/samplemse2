import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async (category = null, startDate = null, endDate = null) => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (category) params.category = category;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await axios.get('/api/expenses', { params });
      setExpenses(response.data.expenses);
      return { success: true, expenses: response.data.expenses, total: response.data.total };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch expenses';
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  const addExpense = useCallback(async (expenseData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/expenses', expenseData);
      setExpenses([response.data.expense, ...expenses]);
      return { success: true, expense: response.data.expense };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to add expense';
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [expenses]);

  const updateExpense = useCallback(async (id, expenseData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/expenses/${id}`, expenseData);
      setExpenses(expenses.map(exp => exp._id === id ? response.data.expense : exp));
      return { success: true, expense: response.data.expense };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update expense';
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [expenses]);

  const deleteExpense = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp._id !== id));
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete expense';
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [expenses]);

  const getTotalAmount = useCallback(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  const getExpensesByCategory = useCallback((category) => {
    return expenses.filter(expense => expense.category === category);
  }, [expenses]);

  return (
    <ExpenseContext.Provider value={{
      expenses,
      loading,
      error,
      fetchExpenses,
      addExpense,
      updateExpense,
      deleteExpense,
      getTotalAmount,
      getExpensesByCategory
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};
