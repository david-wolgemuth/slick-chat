// VB clean up

export const routes = (app) => {
  app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/login.html'
      })
      .when('/find-my-teams', {
        templateUrl: 'partials/find-my-teams.html'
      })
      .when('/edit-team/:teamId', {
        templateUrl: 'partials/edit-team.html'
      })
      .when('/edit-user/:userId', {
        templateUrl: 'partials/edit-user.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
};
