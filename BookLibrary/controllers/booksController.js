const Book = require('../models/Book');
const db = require('../db/connection');
const dtos = require('../dtos/dtos');

// ---- GET ALL BOOKS ----
exports.books_get_all = async (req, res) => {
    try {
        const books = await Book.findAll();
        const mappedDTOs = [];
        books.forEach(book => {
            mappedDTOs.push(dtos.mapBookReadDTO(book));
        });
        res.status(200).send(mappedDTOs);
    } catch (err) {
        res.status(500).send(err);
    }
}

// ---- GET BOOK BY ID ----
exports.books_get_by_id = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            const bookReadDTO = dtos.mapBookReadDTO(book);
            res.status(200).send(bookReadDTO);
        } else {
            res.status(404).send({message: 'Book not found'});
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

// ---- CREATE BOOK ----
exports.books_create = async (req, res) => {
    try {
        console.log(req.files);
        const book = await Book.create({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            genre: req.body.genre,
            language: req.body.language,
            publishYear: req.body.publishYear,
            bookPhoto: req.files.bookPhoto ? req.files.bookPhoto[0].destination + '/' + req.files.bookPhoto[0].filename : null,
            bookFile: req.files.bookFile[0].destination + '/' + req.files.bookFile[0].filename
        });
        res.status(200).send({message: 'Book is created.'});
    } catch (err) {
        res.status(500).send(err);
    }
}

// ---- GET BOOK BY GENRE
exports.books_get_by_genre = async (req, res) => {
    try {
        const books = await Book.findAll({where: {genre: req.body.genre}});
        res.status(200).send(books);
    } catch (err) {
        res.status(500).send(err);
    }
}

// ---- GET BOOK BY AVERAGE RATING ----
exports.books_get_by_average_rating = async (req, res) => {
    try {
        const books = await db.query(`SELECT * FROM \`book-library\`.book WHERE sumOfRatings/numOfRatings
         ${req.body.greatherThan ? '>' : '<'} ${req.body.rating}`, {type: db.QueryTypes.SELECT});
        res.status(200).send(books);
    } catch(err) {
        res.status(500).send(err);
    }
}
