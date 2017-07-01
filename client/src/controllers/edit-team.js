export const editTeam = ($rootScope, $scope, $location, $routeParams, userFactory, teamFactory) => {
  $scope.team = {};
  $scope.teamUsers = [];
  $scope.invite = {};

  const retrieveTeam = () => {
    teamFactory.find($routeParams.teamId)
    .then(({ data: { team }}) => {
      $scope.team = team;
    });
  };
  retrieveTeam();
  const retrieveTeamUsers = () => {
    userFactory.index({ teamId: $routeParams.teamId })
    .then(({ data: { users } }) => {
      $scope.users = users;
    });
  };
  retrieveTeamUsers();

  $scope.editTeam = function() {
    // STUB
  };

  $scope.inviteUser = function() {
    teamFactory.inviteUser($scope.invite, $routeParams.teamId)
    .then(({ data: { user }}) => {
      $scope.invite = {}; 
      retrieveTeamUsers();
      $rootScope.$emit('alert', {
        heading: 'Success',
        message: 'Email Sent To ' + user.email,
      });
    });
  };

  
};
