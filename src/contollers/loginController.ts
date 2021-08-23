import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Account from "../models/account";

const AccessDenied = (res: any) => {
  res
    .set(
      "WWW-Authenticate",
      'Basic realm="Access to the staging site", charset="UTF-8"'
    )
    .sendStatus(401);
};

const LoginController = (express: any) => {
  express.post("/login", (req: any, res: any) => {
    Account.findAll({
      where: {
        email: req.body.email,
      },
    })
      .then(async ([account]: any) => {
        if (await bcryptjs.compare(req.body.password, account.password)) {
          const token = jsonwebtoken.sign(
            {
              id: account.id,
              email: account.email,
            },
            process.env.TOKEN_KEY || "asdfasdf"
          );
          // saves token in database
          Account.findByPk(account.id).then((account) => {
            account
              ?.update({ token: token })
              .then((account) => res.json(account));
          });
        } else {
          AccessDenied(res);
        }
      })
      .catch((error) => {
        console.error(error);
        AccessDenied(res);
      });
  });
};

export default LoginController;
