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
});

export default Account;
