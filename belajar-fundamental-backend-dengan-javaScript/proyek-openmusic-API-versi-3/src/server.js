require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const ClientError = require('./exceptions/ClientError');

const app = express();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;

// Middleware untuk parsing JSON
app.use(express.json());

// Routes
app.use(routes);

// Error handling middleware untuk 404
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Resource tidak ditemukan',
  });
});

// Global error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Terjadi kesalahan pada server',
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Server berjalan pada http://${HOST}:${PORT}`);
});
