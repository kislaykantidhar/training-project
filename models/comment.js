'use strict';
const {
  Model
} = require('sequelize');
const {User}=require('./user');
const {Task}=require('./task');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Comment.init({
    taskid:{
      type:DataTypes.INTEGER,
      references:{
          model:Task,
          key:'id'
      }
      },
      time:{
          type:DataTypes.DATE 
      },
      comment:{
          type:DataTypes.TEXT,
          allowNull:false
      },
      commented_by:{
          type:DataTypes.INTEGER,
          references:{
              model:User,
              key:'id'
          }
        }
  }, {
    sequelize,
    timestamps:false,
    modelName: 'Comment',
  });
  return Comment;
};