const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dtos = require('../dtos/dtos');

const invalidUsernameOrPassword = {
    message: 'Invalid Username and Password'
}

// ---- GET ALL USERS ----
exports.users_get_all = async (req, res) => {
    try {
        const users = await User.findAll();
        const mappedDTOs = [];
        users.forEach(user => {
            mappedDTOs.push(dtos.mapUserReadDTO(user));
        });
        res.status(200).send(mappedDTOs);
    } catch (err) {
        res.status(500).send(err);
    }
}

// ---- GET USER BY ID ----
exports.users_get_by_id = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            const userReadDTO = dtos.mapUserReadDTO(user)
            res.status(200).send(userReadDTO);
        } else {
            res.status(404).send({message: 'User not found'});
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

// ---- CREATE USER ----
exports.users_create = async (req, res) => {
    try {
        console.log(req.file);
        const userExist = await User.findOne({where: {username: req.body.username}});
        if (userExist) {
            return res.status(401).send({message: 'Username already exists'});
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    try {
                        const user = await User.create({
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            birthday: req.body.birthday,
                            profilePhoto: req.file.path
                        });
                        res.status(200).send({message: 'User is created.'});
                    } catch (err) {
                        res.status(500).send(err);
                    }
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

// ---- UPDATE USER ----
exports.users_update = async (req, res) => {
    try {
        const userExist = await User.findByPk(req.params.id);
        if (!userExist) {
            res.status(404).send({message: 'User does not exist'});
        } else {
            try {
                const valuesToUpdate = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    birthday: req.body.birthday
                }
                await userExist.update(valuesToUpdate);
                res.status(200).send({message: 'User is updated'});
            } catch (err) {
                res.status(500).send(err);
            }
        }

    } catch (err) {
        res.status(500).send(err);
    }
}

// ---- USER LOGIN ----
exports.users_login = async (req, res) => {
    const userExist = await User.findOne({where: {username: req.body.username}});
    if (userExist) {
        bcrypt.compare(req.body.password, userExist.password, (err, result) => {
            if (err) {
                return res.status(401).json(invalidUsernameOrPassword);
            }
            if (result) {
                const token = jwt.sign({
                        email: userExist.email,
                        id: userExist._id
                    }, process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    });
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            res.status(401).json(invalidUsernameOrPassword);
        });
    } else {
        res.send(invalidUsernameOrPassword);
    }
}

