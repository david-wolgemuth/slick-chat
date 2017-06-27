import { homePage } from './home-page';
import { user } from './user';
import { team } from './team';
import { teamsLogin } from './teams-login';

export const registerControllers = (app) => {
  app.controller('homePageController', homePage);
  app.controller('userController', user);
  app.controller('teamController', team);
  app.controller('teamsLoginController', teamsLogin);
};
