import bcryptjs from "bcryptjs";
import Account from "../models/account";

export const register = async (req: any, res: any) => {
  Account.create({
    email: req.body.email.toLowerCase(),
    password: await bcryptjs.hash(req.body.password, 10),
  })
    .then((account) => {
      res.json(account);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(400);
    });
};
