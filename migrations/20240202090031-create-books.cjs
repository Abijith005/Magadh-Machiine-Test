
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      bookId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      authors: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sellCount: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rating:{
        type:Sequelize.FLOAT,
        allowNull:false,
        validate:{
          min:0,
          max:5
        }
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 100,
          max: 1000,
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Books');
  },
};
