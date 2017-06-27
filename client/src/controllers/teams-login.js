export const teamsLogin = ($scope, $location, teamFactory, userFactory) => {

  const email = $location.search().email;
  $scope.email = email;

  const loadTeamsFromEmail = () => {
    teamFactory.index({ email })
    .then(({ data: { teams } }) => {
      console.log(teams);
      $scope.teams = teams;
    }).catch(console.error);
  };

  loadTeamsFromEmail();
  
  $scope.login = (user, team) => {
    user.email = email;
    userFactory.login(user, team)
    .then(({ message, data: { user } }) => {
      console.log(message, user);
      team.loggedIn = true;
    });
  };

  $scope.logout = (team) => {
    userFactory.logout({ teamId: team._id })
    .then(() => {
      team.loggedIn = false;
    });
  };

};
