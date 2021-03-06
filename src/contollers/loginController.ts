import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Account from "../models/account";
import { __TOKEN_KEY__ } from "../utilities/constants";

export const AccessDenied = (res: any) => {
  res
    .set(
      "WWW-Authenticate",
      'Basic realm="Access to the staging site", charset="UTF-8"'
    )
    .sendStatus(401);
};

export const login = (req: any, res: any) => {
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
          __TOKEN_KEY__
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
};
