import sequelize from "../utils/db.mjs";
import { DataTypes } from "sequelize";
import TodoCategory from "./todoCategory.mjs";
import User from "./user.mjs";

const itemCategory = sequelize.define("itemCategory", {
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

itemCategory.belongsTo(User);
User.hasMany(itemCategory);


export default itemCategory;
