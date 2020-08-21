'use strict';
const {
  Model
} = require('sequelize');
const {Admin}=require('./admin');
const {User}=require('./user');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Task.init({
    created_by:{
      type:DataTypes.INTEGER,
      references:{
          model:Admin,
          key:'id'
      },
      allowNull:false
  },
  id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
  },
  title:{
      type:DataTypes.STRING(600),
      allowNull:false
  },
  summary:{
      type:DataTypes.TEXT
  },
  assigned_to:{
      type:DataTypes.INTEGER,
      references:{
          model:User,
          key:'id'
      }
  },
  created_at:{
      type:DataTypes.DATEONLY
  },
  status:{
      type:DataTypes.STRING,
      validate:{
          isIn:[['unassigned','assigned','done']]
      }
  }
  }, {
    sequelize,
    timestamps:false,
    modelName: 'Task',
  });
  return Task;
};