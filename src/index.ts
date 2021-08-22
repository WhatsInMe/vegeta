import express from "express";
import sequelize from "./util/con";
import seed from "./util/seed";
import Account from "./models/account";
import bodyParser from "body-parser";

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
  Account.findAll().then((accounts) => {
    return res.json(accounts);
  });
});

app.get("/accounts/:id", (req, res) => {
  Account.findAll({
    where: {
      id: req.params.id,
    },
  }).then((accounts) => {
    return res.json(accounts);
  });
});

app.use(express.json());
app.post("/accounts", (req, res) => {
  Account.create(req.body).then((account) => {
    return res.json(account);
  });
});

// app.put("/accounts/:id", (req,res)=>{
//   Account.findByPk(req.params.id).then(account=>{
//     account?.update
//   })
// })

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
