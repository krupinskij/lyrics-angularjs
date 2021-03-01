app.directive('song', [() => {
  return {
    restrict: 'E',
    templateUrl: '/components/song/song.html',
    controller: ($scope, $lyricsApi) => {
      $scope.isProgress = true;
      $scope.isErrorHidden = 'is-hidden';
      $scope.errorMessage = '';
      
      $lyricsApi.get($scope.songTitle, $scope.bandName)
        .then(resp => {
          $scope.isProgress = false;
          $scope.lyrics = resp.data.lyrics;
        }, errorMessage => {
          $scope.isProgress = false;
          $scope.lyrics = errorMessage.data;
          $scope.showErrorNotif(errorMessage.data);
        });

      $scope.showErrorNotif = errorMessage => { 
        $scope.errorMessage = errorMessage;
        $scope.isErrorHidden = '';
      }
      $scope.hideErrorNotif = () => { 
        $scope.isErrorHidden = 'is-hidden'; 
      }
    }
  }
}])