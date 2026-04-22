const Expense = require('../models/Expense');

// @route   POST /expense
// @desc    Add new expense
// @access  Private
exports.createExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date, description } = req.body;
    const userId = req.userId;

    // Validate input
    if (!title || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, amount, and category are required'
      });
    }

    // Create expense
    const expense = await Expense.create({
      userId,
      title,
      amount,
      category,
      date: date || new Date(),
      description
    });

    res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      expense
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /expenses
// @desc    Get all expenses of logged-in user
// @access  Private
exports.getExpenses = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { category, startDate, endDate } = req.query;

    // Build filter
    let filter = { userId };

    if (category) {
      filter.category = category;
    }

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Get expenses with filtering and sorting
    const expenses = await Expense.find(filter)
      .sort({ date: -1 })
      .populate('userId', 'name email');

    // Calculate total
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.status(200).json({
      success: true,
      count: expenses.length,
      total: total,
      expenses
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /expenses/:id
// @desc    Get single expense
// @access  Private
exports.getExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    // Make sure user owns the expense
    if (expense.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this expense'
      });
    }

    res.status(200).json({
      success: true,
      expense
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /expenses/:id
// @desc    Update expense
// @access  Private
exports.updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { title, amount, category, date, description } = req.body;

    let expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    // Make sure user owns the expense
    if (expense.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this expense'
      });
    }

    // Update fields
    if (title) expense.title = title;
    if (amount) expense.amount = amount;
    if (category) expense.category = category;
    if (date) expense.date = date;
    if (description) expense.description = description;

    await expense.save();

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      expense
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /expenses/:id
// @desc    Delete expense
// @access  Private
exports.deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    // Make sure user owns the expense
    if (expense.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this expense'
      });
    }

    await Expense.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /expenses/stats/category
// @desc    Get expense statistics by category
// @access  Private
exports.getCategoryStats = async (req, res, next) => {
  try {
    const userId = req.userId;

    const stats = await Expense.aggregate([
      { $match: { userId: require('mongoose').Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    next(error);
  }
};
