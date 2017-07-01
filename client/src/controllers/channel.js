export const channel = ($scope, $routeParams, channelFactory, messageFactory) => {
  $scope.team = null;
  $scope.channel = null;
  $scope.messages = null;

  const getChannel = () => {
    const { teamId, channelId } = $routeParams;
    channelFactory.find({ teamId, channelId })
    .then(({ data: { channel } }) => {
      $scope.channel = channel;
      $scope.team = channel.team;
      updateMessages();
    });
  };
  getChannel();

  const updateMessages = () => {
    const { team, channel } = $scope;
    messageFactory.index({ team, channel })
    .then(({ data: { messages } }) => {
      $scope.messages = messages;
    });
  };

  $scope.sendMessage = (message) => {
    const { content } = message;
    const { team, channel } = $scope;
    message.content = '';
    messageFactory.create({ team, channel, content })
    .then(({ data: { message } }) => {
      $scope.messages.push(message);
    });
  };

  $scope.keypressOnTextArea = (event, message) => {
    const { key, shiftKey } = event;
    if (key === 'Enter' && !shiftKey) {
      event.preventDefault();
      $scope.sendMessage(message);
    }
  };

};