// VB clean up

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
      .otherwise({
        redirectTo: '/'
      });
  });
};
