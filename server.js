const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./src/db/mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Routes
const bookRoutes = require('./src/routes/bookRoutes');
const computerRoutes = require('./src/routes/computerRoutes');
const borrowerRoutes = require('./src/routes/borrowerRoutes');

app.use('/books', bookRoutes);
app.use('/computers', computerRoutes);
app.use('/borrowers', borrowerRoutes);

app.listen(port, () => {
  console.log(`Library system server running at http://localhost:${port}`);
});
