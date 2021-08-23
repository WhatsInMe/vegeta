import cors from "cors";
import express from "express";
import seed from "./utilities/seed";
import sequelize from "./utilities/connection";
import { __PORT__, __ORIGIN__ } from "./utilities/constants";
import { login } from "./contollers/loginController";
import { register } from "./contollers/registerController";
import {
  deleteAccount,
  getAccount,
  updateAccount,
} from "./contollers/accountController";

console.log("starting");

sequelize.sync({ force: true }).then(() => {
  seed();
});

const app = express();
app.use(
  cors({
    credentials: true,
    origin: __ORIGIN__,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/accounts", getAccounts);
app.delete("/accounts/:id", deleteAccount);
app.get("/accounts/:id", getAccount);
app.put("/accounts/:id", updateAccount);

// app.post("/logout", logout);
app.post("/login", login);
app.post("/register", register);

app.listen(__PORT__, () => {
  console.log(`running on port ${__PORT__}`);
});
