'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Admins', {
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      emailid:{
          type:Sequelize.STRING(30),
          unique:true,
          allowNull:false,
          validate:{
              isEmail:true
          }
      },
      name:{
          type:Sequelize.STRING(40),
          allowNull:false
      },
      password:{
          type:Sequelize.STRING(100),
          allowNull:false
      }
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Admins');
  }
};