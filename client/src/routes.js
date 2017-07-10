export const routes = (app) => {
  app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'login.html',
        controller:  'loginController'
      })
      .when('/my-teams', {
        templateUrl: 'my-teams.html',
        controller:  'myTeamsController'
      })
      .when('/edit-team/:teamId', {
        templateUrl: 'edit-team.html',
        controller:  'editTeamController'
      })
      .when('/edit-user/:userId', {
        templateUrl: 'edit-user.html',
        controller:  'editUserController'
      })
      .when('/teams/:teamId/channels', {
        templateUrl: 'teams-channels.html',
        controller:  'teamsChannelsController'
      })
      .when('/teams/:teamId/:channelId', {
        templateUrl: 'channel.html',
        controller:  'channelController'
      })
      .otherwise({
        template: '<h1 style="color:red;">ROUTE IS NOT REGISTERED</h1>'
      });
  });
};
