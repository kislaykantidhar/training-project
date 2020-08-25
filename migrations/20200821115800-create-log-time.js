'use strict'; 
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LogTimes', {
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
      date: {
        type: Sequelize.DATEONLY
      },
      startedAt: {
        type: Sequelize.TIME
      },
      endedAt: {
        type: Sequelize.TIME
      },
      timeSpent:{
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('LogTimes');
  }
};