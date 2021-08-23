import jsonwebtoken from "jsonwebtoken";

const authenticate = (req: any, res: any, next: any) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required.");
  }

  try {
    // console.log(
    //   jsonwebtoken.verify(token, process.env.TOKEN_KEY || "asdfasdf")
    // );
    req.user = jsonwebtoken.verify(token, process.env.TOKEN_KEY || "asdfasdf");
  } catch (error) {
    console.error(error);
    return res.sendStatus(401);
  }

  return next();
};

export default authenticate;
