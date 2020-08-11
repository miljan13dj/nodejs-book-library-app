const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const booksController = require('../controllers/booksController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'bookPhoto') { // if uploading bookPhoto
            cb(null, 'uploads/bookPhotos');
        } else { // else uploading bookFile
            cb(null, 'uploads/bookFiles');
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimeType === 'image/jpeg' || file.mimeType === 'image/jpg' || file.mimeType === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});

const multerFields = [ {name: 'bookPhoto', maxCount: 1}, {name: 'bookFile', maxCount: 1} ]

router.get('/', checkAuth, booksController.books_get_all);
router.get('/:id', checkAuth, booksController.books_get_by_id);
router.post('/', checkAuth, upload.fields(multerFields), booksController.books_create);
router.post('/genre', checkAuth, booksController.books_get_by_genre);
router.post('/rating', checkAuth, booksController.books_get_by_average_rating);

module.exports = router;
