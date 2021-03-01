app.directive('settings', [() => {
  return {
    restrict: 'E',
    templateUrl: '/components/settings/settings.html',
    controller: ($scope, $localStorage) => {
      $scope.setPrimaryTheme = value => {
        $localStorage.set('primary-theme', value);
      }
    }
  }
}])