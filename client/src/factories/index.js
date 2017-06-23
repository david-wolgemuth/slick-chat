import { UserFactory } from './user';

export const registerFactories = (app) => {

  app.factory('userFactory', () => new UserFactory());

};