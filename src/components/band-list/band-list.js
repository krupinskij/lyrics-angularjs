app.directive('bandList', [function() {
  return {
    restrict: 'E',
    scope: {
      bandName: '=band'
    },
    templateUrl: '/components/band-list/band-list.html',
    controller: ($scope, $database) => {
      $scope.isLoading = 'is-loading';
      $scope.isErrorHidden = 'is-hidden';
      $scope.errorMessage = '';

      $database.getBandNames()
        .then(
          data => {
            $scope.bands = data;
            $scope.isLoading = '';
          },
          errorMessage => {
            $scope.errorMessage = errorMessage;
            $scope.showErrorNotif();
          }
        )
      
      $scope.showErrorNotif = () => { $scope.isErrorHidden = ''; }
      $scope.hideErrorNotif = () => { $scope.isErrorHidden = 'is-hidden'; }
    }
  }
}])