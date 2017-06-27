export const team = ($scope, $location, $routeParams, userFactory, teamFactory) => {
  $scope.team = {};
  $scope.teams = [];
  $scope.invite = {};

  $scope.teams = teamFactory.teams;

  $scope.editTeam = function() {
    console.log($scope.team);
  };

  $scope.inviteUser = function() {
    console.log($scope.invite);

    teamFactory.inviteUser($scope.invite, $routeParams.teamId);
  };

  
};
