import { UserFactory } from './user';
import { TeamFactory } from './team';
import { MessageFactory } from './message';
import { ChannelFactory } from './channel';

export const registerFactories = (app) => {

  app.factory('userFactory', ($http, $location) => new UserFactory($http, $location));
  app.factory('teamFactory', ($http, $location) => new TeamFactory($http, $location));
  app.factory('channelFactory', ($http) => new ChannelFactory($http));
  app.factory('messageFactory', ($http) => new MessageFactory($http));

};