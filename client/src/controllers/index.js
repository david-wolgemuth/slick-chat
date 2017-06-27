import { homePage } from './home-page';
import { login } from './loginReg';

export const registerControllers = (app) => {
  app.controller('homePageController', homePage);
  app.controller('loginRegController', login);
};
