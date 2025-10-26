const express = require('express');
const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require('./handler');

const router = express.Router();

// Route untuk menambah buku
router.post('/books', addBookHandler);

// Route untuk mendapatkan semua buku
router.get('/books', getAllBooksHandler);

// Route untuk mendapatkan detail buku berdasarkan id
router.get('/books/:bookId', getBookByIdHandler);

// Route untuk mengubah data buku berdasarkan id
router.put('/books/:bookId', editBookByIdHandler);

// Route untuk menghapus buku berdasarkan id
router.delete('/books/:bookId', deleteBookByIdHandler);

module.exports = router;
