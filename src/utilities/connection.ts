import { Sequelize } from "sequelize";
import { __DB__ } from "./constants";

const sequelize = new Sequelize(__DB__);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
