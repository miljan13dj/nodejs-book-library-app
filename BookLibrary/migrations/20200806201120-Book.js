'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('book', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(2000),
        allowNull: false
      },
      author: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.ENUM,
        values: ['ADVENTURE', 'CHILDREN', 'DRAMA', 'FANTASY', 'ROMANCE', 'HISTORY', 'SKILLS', 'SPORTS', 'TRAVEL', 'OTHER']
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false
      },
      publishYear: {
        type: Sequelize.INTEGER,
      },
      numOfRatings: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      sumOfRatings: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      bookPhoto: {
        type: Sequelize.STRING
      },
      bookFile: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, {
      freezeTableName: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('book');
  }
};
