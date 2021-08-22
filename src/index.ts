import express from "express";
import sequelize from "./util/con";
import seed from "./util/seed";
import Account from "./models/account";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

console.log("starting");

sequelize.sync({ force: true }).then(() => {
  console.log("create tables");
  seed();
});

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hello world!" });
});

app.get("/accounts", (req, res) => {
  Account.findAll().then((accounts) => {
    res.json(accounts);
  });
});

app.get("/accounts/:id", (req, res) => {
  Account.findAll({
    where: {
      id: req.params.id,
    },
  }).then(([account]: any) => {
    res.json(account);
  });
});

app.post("/login", (req, res) => {
  Account.findAll({
    where: {
      email: req.body.email,
    },
  })
    .then(async ([account]: any) => {
      if (await bcryptjs.compare(req.body.password, account.password)) {
        const token = jsonwebtoken.sign(
          {
            email: account.email,
          },
          process.env.TOKEN_KEY || "asdfasdf"
        );
        Account.findByPk(account.id).then((account) => {
          account
            ?.update({ token: token })
            .then((account) => res.json(account));
        });
      } else {
        res
          .set(
            "WWW-Authenticate",
            'Basic realm="Access to the staging site", charset="UTF-8"'
          )
          .sendStatus(401);
      }
    })
    .catch((error) => {
      console.error(error);
      res
        .set(
          "WWW-Authenticate",
          'Basic realm="Access to the staging site", charset="UTF-8"'
        )
        .sendStatus(401);
    });
});

app.post("/accounts", async (req, res) => {
  Account.create({
    email: req.body.email.toLowerCase(),
    password: await bcryptjs.hash(req.body.password, 10),
  })
    .then((account) => {
      res.json(account);
    })
    .catch((error) => {
      res.sendStatus(400);
    });
});

app.put("/accounts/:id", (req, res) => {
  Account.findByPk(req.params.id).then((account) => {
    account?.update(req.body).then((account) => res.json(account));
  });
});

app.delete("/accounts/:id", (req, res) => {
  Account.findByPk(req.params.id)
    .then((account) => {
      account?.destroy();
    })
    .then((account) => {
      res.sendStatus(200);
    });
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
