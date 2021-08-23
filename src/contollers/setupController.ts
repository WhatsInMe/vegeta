import AccountController from "./accountController";
import LoginController from "./loginController";

const SetupController = (app: any) => {
  AccountController(app);
  LoginController(app);
};

export default SetupController;
