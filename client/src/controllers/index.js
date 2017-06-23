import { homePage } from './home-page';

export const registerControllers = (app) => {
  app.controller('homePageController', homePage);
};
