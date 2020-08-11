const express = require('express');
const router = express.Router();
const bookReviewsController = require('../controllers/bookReviewsController');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, bookReviewsController.booksReviews_get_all);
router.get('/:id', checkAuth, bookReviewsController.bookReviews_get_by_id);
router.get('/book/:bookId', checkAuth, bookReviewsController.bookReviews_get_by_book_id);
router.get('/user/:userId', checkAuth, bookReviewsController.bookReviews_get_by_user_id);
router.post('/', checkAuth, bookReviewsController.bookReviews_create);

module.exports = router;
