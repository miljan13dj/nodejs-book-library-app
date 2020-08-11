const BookReview = require('../models/BookReview');
const Book = require('../models/Book');
const User = require('../models/User');
const mail = require ('../common/nodemailer');

// const transporter = mail.transporter;  TODO: add email and password for you gmail account

// ---- GET ALL BOOK REVIEWS ----
exports.booksReviews_get_all = async (req, res) => {
    try {
        const bookReviews = await BookReview.findAll();
        res.status(200).send(bookReviews);
    } catch (err) {
        res.status(500).send(err);
    }
}

// ---- GET BOOK REVIEW BY ID ----
exports.bookReviews_get_by_id = async (req, res) => {
    try {
        const bookReview = await BookReview.findByPk(req.params.id);
        if (bookReview) {
            res.status(200).send(bookReview);
        } else {
            res.status(404).send({message: 'Book not found'});
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

// ---- GET BOOK REVIEWS BY BOOK ID ----
exports.bookReviews_get_by_book_id = async (req, res) => {
    try {
        const bookReviews = await BookReview.findAll({where: {bookId: req.params.bookId}});
        if (bookReviews.length > 0) {
            res.status(200).send(bookReviews);
        } else {
            res.status(404).send({message: 'No book reviews for this book'});
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

// ---- GET BOOK REVIEWS BY USER ID ----
exports.bookReviews_get_by_user_id = async (req, res) => {
    try {
        const bookReviews = await BookReview.findAll({where: {userId: req.params.userId}});
        if (bookReviews.length > 0) {
            res.status(200).send(bookReviews);
        } else {
            res.status(404).send({message: 'No book reviews created by this user'});
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

// ---- CREATE BOOK REVIEW ----
exports.bookReviews_create = async (req, res) => {
    try {
        const bookReview = await BookReview.create({
            bookId: req.body.bookId,
            userId: req.body.userId,
            rating: req.body.rating,
            review: req.body.review
        });
        try {
            const book = await Book.findByPk(req.body.bookId);
            await book.update({
                numOfRatings: ++book.numOfRatings,
                sumOfRatings: book.sumOfRatings + req.body.rating
            });

            const user = await User.findByPk(req.body.userId);
            /*const mailOptions = {
                from: '',  // Your email address
                to: user.email,
                subject: 'Notification from book library',
                text: `Thank you for your time ${user.firstName}, here's some file, just change the name and pass it to your CTO friends.`,
                attachments: [
                    {filename: book.bookFile.replace(/^.*[\\\/]/, ''), path: book.bookFile}
                ]
            }
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send(bookReview);
                }
            });*/
            res.status(200).send(bookReview);
        } catch (err) {
            res.status(500).send(err);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
