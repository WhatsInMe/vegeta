import express from "express";
import sequelize from "./util/con";
import seed from "./util/seed";
import SetupController from "./contollers/setupController";
import { __PORT__ } from "./util/constants";

console.log("starting");

sequelize.sync({ force: true }).then(() => {
  // console.log("create tables");
  // seed();
});

const app = express();
app.use(express.json());

SetupController(app);

app.listen(__PORT__, () => {
  console.log(`running on port ${__PORT__}`);
});
