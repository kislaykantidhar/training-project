'use strict'; 
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER,
        references:{
            model:'Admins',
            key:'id',
            deferrable:Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
        allowNull:false
      },
      title: {
        type: Sequelize.STRING(600),
        allowNull:false
      },
      summary: {
        type: Sequelize.TEXT
      },
      assigned_to: {
        type: Sequelize.INTEGER,
        references:{
            model:'Users',
            key:'id'
        }
      },
      created_at: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.STRING,
        validate:{
            isIn:[['unassigned','assigned','done']]
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tasks');
  }
};