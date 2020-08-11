const express = require('express');
const logger = require('morgan');
const db = require('./db/connection');
const app = express();
require('dotenv/config');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRoutes = require('./routes/users');
const booksRoutes = require('./routes/books');
const bookReviewsRoutes = require('./routes/bookReviews');

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/bookReviews', bookReviewsRoutes);

db.authenticate()
    .then(() => console.log('DATABASE CONNECTED'))
    .catch(err => console.log('Error: ', err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`APP Started on port ${port}`);
});
