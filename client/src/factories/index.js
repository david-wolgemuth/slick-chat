import { UserFactory } from './user';
import { TeamFactory } from './team';

export const registerFactories = (app) => {

  app.factory('userFactory', ($http, $location) => new UserFactory($http, $location));
  app.factory('teamFactory', ($http, $location) => new TeamFactory($http, $location));

};