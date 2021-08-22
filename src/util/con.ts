import { Sequelize } from "sequelize";

const DB = process.env.DB || "postgres://postgres:postgres@localhost:5432/postgres"
const sequelize = new Sequelize(DB);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
