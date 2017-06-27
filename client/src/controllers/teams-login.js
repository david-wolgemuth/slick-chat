export const teamsLogin = ($scope, $location, teamFactory) => {
  const email = $location.search().email;
  teamFactory.index({ email })
  .then(({ teams, message }) => {
    $scope.teams = teams;
    alert(message);
  }).catch(console.error);
};
