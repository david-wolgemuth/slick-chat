import { homePage } from './home-page';
import { login } from './login';
import { editTeam } from './edit-team';
import { editUser } from './edit-user';
import { myTeams } from './my-teams';
import { alerts } from './alerts';

export const registerControllers = (app) => {
  app.controller('homePageController', homePage);
  app.controller('loginController', login);
  app.controller('editTeamController', editTeam);
  app.controller('editUserController', editUser);
  app.controller('myTeamsController', myTeams);
  app.controller('alertsController', alerts);
};
