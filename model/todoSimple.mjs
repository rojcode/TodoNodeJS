import { DataTypes } from "sequelize";
import User from "../model/user.mjs";
import sequelize from "../utils/db.mjs";

const simpleTodo = sequelize.define("simpleTodo", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  
});


simpleTodo.belongsTo(User);
User.hasMany(simpleTodo)


export default simpleTodo;