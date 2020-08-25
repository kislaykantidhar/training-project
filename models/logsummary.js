'use strict';
const {
  Model
} = require('sequelize');

const {LogTime}=require('./logtime');
module.exports = (sequelize, DataTypes) => {
  class Logsummary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Logsummary.belongsTo(models.LogTime);
    }
  };
  Logsummary.init({
    
    summary:{
      type:DataTypes.TEXT,
      allowNull:false
    } 

  }, {
    sequelize,
    timestamps:false,
    modelName: 'Logsummary',
  });
  
  return Logsummary;
};