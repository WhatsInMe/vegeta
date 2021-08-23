import Account from "../models/account";
import jsonwebtoken from "jsonwebtoken";

const authenticate = (req: any, res: any, next: any) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required.");
  }

  try {
    console.log(
      jsonwebtoken.verify(token, process.env.TOKEN_KEY || "asdfasdf")
    );
    console.log(
      jsonwebtoken.verify(token, process.env.TOKEN_KEY || "asdfasdf")
    );
    console.log(
      jsonwebtoken.verify(token, process.env.TOKEN_KEY || "asdfasdf")
    );
    console.log(
      jsonwebtoken.verify(token, process.env.TOKEN_KEY || "asdfasdf")
    );
  } catch (error) {}

  // Account.findByPk(req.params.id)
  //   .then((account: any) => {
  //     console.log("request token:")
  //     console.log(token)
  //     console.log(token)
  //     console.log(token)
  //     console.log(token)
  //     console.log(token)
  //     console.log("request token:")
  //     console.log(account.token)
  //     console.log(account.token)
  //     console.log(account.token)
  //     console.log(account.token)
  //     console.log(account.token)
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  return next();
};

export default authenticate;
