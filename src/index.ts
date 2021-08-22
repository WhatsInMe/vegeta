import express from "express";
import sequelize from "./util/con";
import seed from "./util/seed"
import Account from "./models/account"

console.log("starting");

sequelize.sync({ force: true }).then(() => {
  console.log("create tables");
  seed();
});

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "hello world!" });
});

app.get("/accounts", (req, res) => {
  Account.findAll().then(accounts => {
    return res.json(accounts)
  })
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
