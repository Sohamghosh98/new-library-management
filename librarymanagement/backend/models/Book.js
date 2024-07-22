// models/Book.js
const pool = require('../config/db');

const getAllBooks = async () => {
    const result = await pool.query('SELECT * FROM books');
    return result.rows;
};

const borrowBook = async (userId, bookId) => {
    const result = await pool.query(
        'INSERT INTO borrowed_books (user_id, book_id) VALUES ($1, $2) RETURNING *',
        [userId, bookId]
    );
    return result.rows[0];
};

const returnBook = async (userId, bookId) => {
    const result = await pool.query(
        'DELETE FROM borrowed_books WHERE user_id = $1 AND book_id = $2 RETURNING *',
        [userId, bookId]
    );
    return result.rows[0];
};

const getUserBorrowedBooks = async (userId) => {
    const result = await pool.query(
        'SELECT books.* FROM books JOIN borrowed_books ON books.id = borrowed_books.book_id WHERE borrowed_books.user_id = $1',
        [userId]
    );
    return result.rows;
};

module.exports = {
    getAllBooks,
    borrowBook,
    returnBook,
    getUserBorrowedBooks,
};
