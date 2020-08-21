'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      emailid: {
        type: Sequelize.STRING(30),
        unique:true,
        allowNull:false,
        validate:{
            isEmail:true
        }
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull:false
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull:false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};