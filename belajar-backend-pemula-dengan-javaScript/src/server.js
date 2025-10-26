const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 9000;

// Middleware untuk parsing JSON
app.use(express.json());

// Gunakan routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
