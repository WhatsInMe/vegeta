import Account from "../models/account";
import bcryptjs from "bcryptjs";

const seed = async () => {
  Account.bulkCreate([
    {
      email: "wyatt@gmail.com",
      password: await bcryptjs.hash("pass", 10),
    },
    {
      email: "stevejobs@gmail.com",
      password: await bcryptjs.hash("pass", 10),
    },
    {
      email: "billgates@gmail.com",
      password: await bcryptjs.hash("pass", 10),
    },
    {
      email: "bigchungus@gmail.com",
      password: await bcryptjs.hash("pass", 10),
    },
  ])

    // .then(() => {
    //   return Account.findAll();
    // })
    // .then((notes) => {
    //   console.log(notes);
    // });

};

export default seed;
