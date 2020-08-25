'use strict';
const {
  Model
} = require('sequelize');

const {Task}=require('./task');

module.exports = (sequelize, DataTypes) => {
  class LogTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LogTime.hasOne(models.Logsummary)
    }
  }; 
  LogTime.init({
    taskid:{
      type:DataTypes.INTEGER,
      references:{
          model:Task,
          key:'id'
      }
      },
      date:{
          type:DataTypes.DATEONLY
      },
      startedAt:{
          type:DataTypes.TIME
      },
      endedAt:{
          type:DataTypes.TIME
      },
      timeSpent:{
        type: DataTypes.INTEGER
      }
  }, {
    sequelize,
    timestamps:false,
    modelName: 'LogTime',
  });
  return LogTime;
};