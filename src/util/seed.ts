import Account from "../models/account";

const seed = () => {
  Account.bulkCreate([
    {
      email: "wyatt@gmail.com",
      password: "pass",
    },
    {
      email: "stevejobs@gmail.com",
      password: "pass",
    },
    {
      email: "billgates@gmail.com",
      password: "pass",
    },
    {
      email: "bigchungus@gmail.com",
      password: "pass",
    },
  ])
    .then(() => {
      return Account.findAll();
    })
    .then((notes) => {
      console.log(notes);
    });
};

export default seed;
