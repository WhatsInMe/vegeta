import bcryptjs from "bcryptjs";
import Account from "../models/account";
import jsonwebtoken from "jsonwebtoken";

const verifyToken = (req: any, res: any, next: any) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required.");
  }
  return next();
};

const AccountController = (app: any) => {
  app.get("/", (req: any, res: any) => {
    res.json({ message: "hello world!" });
  });

  app.get("/accounts", (req: any, res: any) => {
    Account.findAll().then((accounts) => {
      res.json(accounts);
    });
  });

  app.get("/accounts/:id", verifyToken, (req: any, res: any) => {
    Account.findAll({
      where: {
        id: req.params.id,
      },
    }).then(([account]: any) => {
      res.json(account);
    });
  });

  app.post("/accounts", async (req: any, res: any) => {
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

  app.put("/accounts/:id", (req: any, res: any) => {
    Account.findByPk(req.params.id).then((account) => {
      account?.update(req.body).then((account) => res.json(account));
    });
  });

  app.delete("/accounts/:id", (req: any, res: any) => {
    Account.findByPk(req.params.id)
      .then((account) => {
        account?.destroy();
      })
      .then((account) => {
        res.sendStatus(200);
      });
  });
};

export default AccountController;
