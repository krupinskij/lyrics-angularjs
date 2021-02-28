app.directive('songList', [function() {
  return {
    restrict: 'E',
    scope: {
      bandName: '=band'
    },
    templateUrl: '/components/song-list/song-list.html',
    controller: ($scope, $database) => {
      $scope.isProgress = true;
      $scope.isErrorHidden = 'is-hidden';
      $scope.errorMessage = '';
      $scope.title = '';

      if($scope.bandName) {
        $scope.title = `${ $scope.bandName } songs`;
        $database.getByBandName($scope.bandName)
        .then(
          data => {
            $scope.isProgress = false;
            $scope.songs = data;
          },
          errorMessage => {
            $scope.isProgress = false;
            $scope.errorMessage = errorMessage;
            $scope.showErrorNotif();
          }
        )
      } else {
        $scope.title = 'my playlist';
        $database.getAll()
        .then(
          data => {
            $scope.isProgress = false;
            $scope.songs = data;
          },
          errorMessage => {
            $scope.isProgress = false;
            $scope.errorMessage = errorMessage;
            $scope.showErrorNotif();
          }
        )
      }
      
      
      $scope.showErrorNotif = () => { $scope.isErrorHidden = ''; }
      $scope.hideErrorNotif = () => { $scope.isErrorHidden = 'is-hidden'; }
    }
  }
}])