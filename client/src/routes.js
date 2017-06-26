// require()
// require('./partials/login.html');

export const routes = (app) => {
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'login.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
};
