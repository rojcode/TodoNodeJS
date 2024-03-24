import sequelize from "../utils/db.mjs";
import { DataTypes } from "sequelize";

const userSetting = sequelize.define("userSettings", {
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telegramId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default userSetting;
