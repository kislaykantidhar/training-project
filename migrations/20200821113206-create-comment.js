'use strict'; 
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taskid: {
        type: Sequelize.INTEGER,
        references:{
          model:'Tasks',
          key:'id'
         }
      },
      time: {
        type: Sequelize.DATE
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      commented_by: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};