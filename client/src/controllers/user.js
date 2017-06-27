export const user = ($scope, $location, userFactory, teamFactory) => {
  $scope.user = {};

  $scope.findTeam = function() {
    console.log($scope.user.email);
  };

  $scope.createTeam = function() {
    userFactory.createTeam($scope.user, setUserTeamId);
  };

  const setUserTeamId = function(teamId) {
    $scope.user.id = userFactory.user.id;
    $scope.user = {};
    teamFactory.addTeamId(teamId);
  };
};
