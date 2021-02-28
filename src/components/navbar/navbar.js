app.directive('navbar', [() => {
  return {
    restrict: 'E',
    templateUrl: '/components/navbar/navbar.html',
    controller: ($scope) => {
      $scope.isActive = '';

      $scope.toggleDropdown = () => {
        $scope.isActive = !$scope.isActive ? 'is-active' : '';
      }
    }
  }
}])