// VB clean up

export const routes = (app) => {
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'login.html'
      })
      .when('/select-teams', {
        templateUrl: 'select-teams.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
};
