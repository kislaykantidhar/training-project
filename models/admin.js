'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Admin.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
  },
  emailid:{
      type:DataTypes.STRING(30),
      unique:true,
      allowNull:false,
      validate:{
          isEmail:true
      }
  },
  name:{
      type:DataTypes.STRING(40),
      allowNull:false
  },
  password:{
      type:DataTypes.STRING(100),
      allowNull:false
  }
  }, {
    sequelize,
    timestamps:false,
    modelName: 'Admin',
  });
  return Admin;
};