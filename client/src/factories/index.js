import { UserFactory } from './user';

export const registerFactories = (app) => {

  app.factory('userFactory', ($http) => new UserFactory($http));

};