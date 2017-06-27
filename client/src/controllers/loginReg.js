export const login = ($scope, userFactory) => {
  $scope.user = {};

  $scope.findTeam = function() {
    console.log($scope.user.email);
  };

  $scope.createTeam = function() {
    userFactory.createTeam($scope.user);
  };
};
