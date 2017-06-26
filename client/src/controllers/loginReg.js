export const login = ($scope, userFactory) => {
  $scope.users = userFactory.index();
};
