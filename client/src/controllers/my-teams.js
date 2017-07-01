export const myTeams = ($scope, $location, teamFactory, userFactory) => {

  const email = $location.search().email;
  $scope.email = email;

  const loadTeamsFromEmail = () => {
    teamFactory.index({ email })
    .then(({ data: { teams } }) => {
      $scope.teams = teams;
    });
  };

  loadTeamsFromEmail();
  
  $scope.login = (user, team) => {
    user.email = email;
    userFactory.login(user, team)
    .then(({ message, data: { user } }) => {
      team.loggedInUserId = user._id;
    });
  };

  $scope.logout = (team) => {
    userFactory.logout({ teamId: team._id })
    .then(() => {
      team.loggedIn = false;
    });
  };

};
