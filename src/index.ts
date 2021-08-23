import express from "express";
import sequelize from "./util/con";
import seed from "./util/seed";
import SetupController from "./contollers/setupController"

console.log("starting");

sequelize.sync({ force: true }).then(() => {
  console.log("create tables");
  seed();
});

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

// AccountController(app);
// LoginController(app);
SetupController(app);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
