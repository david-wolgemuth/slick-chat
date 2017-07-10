export const login = ($rootScope, $scope, $location, userFactory) => {
  $scope.user = { email: '' };

  $scope.findTeam = function() {
    $location.url('my-teams');
    $location.search('email', $scope.user.email);
  }; 

  $scope.createTeam = function() {
    userFactory.createTeam($scope.user)
    .then(() => {
      $rootScope.$emit('alert', {
        heading: 'Created Team',
        message: 'Check Your Email For Password',
        timeout: 6000
      });
      $scope.findTeam();
    });
  };
};
