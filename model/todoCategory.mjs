import sequelize from "../utils/db.mjs";
import { DataTypes } from "sequelize";
import User from "./user.mjs";
import itemCategory from './itemsCateogry.mjs';

const TodoCategory = sequelize.define('TodoCategory',{

    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    time:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
        allowNull:false
    }

   
});

TodoCategory.belongsTo(User);
User.hasMany(TodoCategory);

TodoCategory.belongsToMany(itemCategory,{through:'itemTodoCategories'});
itemCategory.belongsTo(TodoCategory);


export default TodoCategory;
