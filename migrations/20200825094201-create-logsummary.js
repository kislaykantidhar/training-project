'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Logsummaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      LogTimeId:{
        type:Sequelize.INTEGER,
        references:
        {
          model:'LogTimes',
          key:'id'
        }

      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Logsummaries');
  }
};