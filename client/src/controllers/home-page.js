
export const homePage = ($scope, userFactory) => {
  $scope.users = userFactory.index();
};
