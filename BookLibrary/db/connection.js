const Sequelize = require('sequelize');
const sequelize = new Sequelize('book-library', 'root', 'admin',
    {
        host: 'localhost',
        dialect: 'mysql'
    });

module.exports = sequelize;
