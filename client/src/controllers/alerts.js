export const alerts = ($rootScope, $scope, $timeout) => {
  const resetAlert = () => {
    $scope.alert = { heading: '', message: '', type: '' };
  };
  resetAlert();

  /*
    Trigger Alert Example:
    $rootScope.$emit('alert', {
      heading: 'ERROR',
      message: 'Something Bad Happened',
      type: 'danger',  // ('success', 'info', 'warning', 'danger')
      timeout: 5000    // 5 seconds
    })
  */
  const displayAlert = (event, { heading='', message, type='success', timeout=2000 }) => {
    $scope.alert = { heading, message, type };
    $timeout(resetAlert, timeout);
  };
  $rootScope.$on('alert', displayAlert);
};