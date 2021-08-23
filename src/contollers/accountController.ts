import Account from "../models/account";

export const helloWorld = (req: any, res: any) => {
  res.json({ message: "hello world!" });
};

export const getAccount = (req: any, res: any) => {
  // if (req.user.id != req.params.id) {
  //   return res.sendStatus(401);
  // }

  // Account.findAll({
  //   where: {
  //     id: req.params.id,
  //   },
  // })

  Account.findByPk(req.params.id)
    .then((account: any) => {
      if (!account) {
        return res.sendStatus(404);
      }
      res.json(account);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
};

export const updateAccount = (req: any, res: any) => {
  Account.findByPk(req.params.id).then((account) => {
    account?.update(req.body).then((account) => res.json(account));
  });
};

export const deleteAccount = (req: any, res: any) => {
  Account.findByPk(req.params.id)
    .then((account) => {
      account?.destroy();
    })
    .then((account) => {
      res.sendStatus(200);
    });
};
