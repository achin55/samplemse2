const express = require('express');
const router = express.Router();
const {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
  getCategoryStats
} = require('../controllers/expenseController');
const { protect } = require('../middleware/auth');

// All expense routes require authentication
router.use(protect);

router.post('/', createExpense);
router.get('/', getExpenses);
router.get('/stats/category', getCategoryStats);
router.get('/:id', getExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
