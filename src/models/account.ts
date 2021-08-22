import { DataTypes } from "sequelize";
import sequelize from "../util/con";

const Account = sequelize.define("account", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Account;
