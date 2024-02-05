'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Users',
          key:'id'
        }
      },
      bookId: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model:'Books',
          key:"bookId"
        }
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue:0,
        validate:{
          min:0,
          max:5
        }
      },
      review:{
        type:Sequelize.TEXT,
        allowNull:true
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');

  }
};
