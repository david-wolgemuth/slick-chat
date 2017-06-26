export const login = ($scope, userFactory) => {
  $scope.login = {};
  $scope.register = {};
  $scope.users = userFactory.index();

  $scope.userLogin = function() {
    userFactory.login();
  };
};
