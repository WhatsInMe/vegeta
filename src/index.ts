import { Sequelize, Model, DataTypes } from "sequelize";
import express from "express";
import sequelize from "./util/con";
import Account from "./models/account";

console.log("starting");

sequelize.sync({ force: true }).then(() => {
  console.log("create tables");
  Account.bulkCreate([
    {
      email: "wyatt@gmail.com",
      password: "pass",
    },
    {
      email: "stevejobs@gmail.com",
      password: "pass",
    },
    {
      email: "billgates@gmail.com",
      password: "pass",
    },
    {
      email: "bigchungus@gmail.com",
      password: "pass",
    },
  ])
    .then(() => {
      return Account.findAll();
    })
    .then((notes) => {
      console.log(notes);
    });
});

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "hello world!" });
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
