import express from "express";
import sequelize from "./util/con";
import seed from "./util/seed";
import Account from "./models/account";

console.log("starting");

sequelize.sync({ force: true }).then(() => {
  console.log("create tables");
  seed();
});

const app = express();
const port = 3000;
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

app.post("/login", (req, res) =>
  Account.findAll({
    where: {
      email: req.body.email,
    },
  })
    .then(([account]: any) => {
      if (req.body.password === account.password) {
        res.json({ asdf: "ok" });
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
    })
);

app.post("/accounts", (req, res) => {
  Account.create(req.body)
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
