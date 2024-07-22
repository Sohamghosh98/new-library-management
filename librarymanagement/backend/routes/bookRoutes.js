// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/books', authMiddleware, bookController.getBooks);
router.get('/user/books', authMiddleware, bookController.getUserBooks);
router.post('/books/borrow', authMiddleware, bookController.borrowBook);
router.post('/books/return', authMiddleware, bookController.returnBook);

module.exports = router;
