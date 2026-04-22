const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    title: {
      type: String,
      required: [true, 'Please provide an expense title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
      min: [0, 'Amount must be a positive number']
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['Food', 'Travel', 'Bills', 'Entertainment', 'Health', 'Education', 'Shopping', 'Other'],
      default: 'Other'
    },
    date: {
      type: Date,
      required: [true, 'Please provide a date'],
      default: Date.now
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters']
    }
  },
  { timestamps: true }
);

// Index for userId to speed up queries
expenseSchema.index({ userId: 1 });

module.exports = mongoose.model('Expense', expenseSchema);
