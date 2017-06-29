export const teamsChannels = ($scope, teamFactory, $routeParams, channelFactory) => {
  $scope.team = null;
  $scope.channel = null;
  $scope.channels = null;

  $scope.loadTeamAndChannels = () => {
    const { teamId } = $routeParams;
    teamFactory.find(teamId)
    .then(({ data: { team } }) => {
      $scope.team = team;
      channelFactory.index({ team })
      .then(({ data: { channels }}) => {
        console.log("CHANNELS:", channels);
        $scope.channels = channels;
      });
    });
  };

  $scope.loadTeamAndChannels();

  $scope.createChannel = () => {
    const { team, channel: { name, isPrivate } } = $scope;
    channelFactory.create({ team, name, isPrivate })
    .then(console.log).catch(console.error);
  };
};
