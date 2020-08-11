const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const usersController = require('../controllers/usersController');

// CALLS EVERY TIME file is Received
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/user/');
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
        fileSize: 1024 * 1024 * 5
    }
});

router.get('/', checkAuth, usersController.users_get_all);
router.get('/:id', checkAuth, usersController.users_get_by_id);
router.post('/', upload.single('profilePhoto'), usersController.users_create);
router.post('/login', usersController.users_login);
router.patch('/:id', checkAuth, upload.single('profilePhoto'), usersController.users_update);

module.exports = router;
