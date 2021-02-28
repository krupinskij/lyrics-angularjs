app.directive('bandList', [function() {
  return {
    restrict: 'E',
    scope: {
      bandName: '=band'
    },
    templateUrl: '/components/band-list/band-list.html',
    controller: ($scope, $database) => {
      $scope.isProgress = true;
      $scope.isErrorHidden = 'is-hidden';
      $scope.errorMessage = '';

      $database.getBandNames()
        .then(
          data => {
            $scope.isProgress = false;
            $scope.bands = data;
          },
          errorMessage => {
            $scope.isProgress = false;
            $scope.errorMessage = errorMessage;
            $scope.showErrorNotif();
          }
        )
      
      $scope.showErrorNotif = () => { $scope.isErrorHidden = ''; }
      $scope.hideErrorNotif = () => { $scope.isErrorHidden = 'is-hidden'; }
    }
  }
}])