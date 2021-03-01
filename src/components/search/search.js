app.directive('search', [() => {
  return {
    restrict: 'E',
    templateUrl: '/components/search/search.html',
    controller: ($scope, $location, $database, $lyricsApi) => {
      $scope.isLoading = '';
      $scope.isErrorHidden = 'is-hidden';
      $scope.errorMessage = '';

      $scope.find = () => {
        $scope.isLoading = 'is-loading';
        $lyricsApi.get($scope.songTitle, $scope.bandName)
        .then(() => {
          $database.save({ title: $scope.songTitle, band: $scope.bandName })
          .then(() => {
              $scope.isLoading = '';
              $location.path(`/song/${$scope.bandName}/${$scope.songTitle}`)
            },
            errorMessage => {
              $scope.isLoading = '';
              $scope.showErrorNotif(errorMessage);
            });
        }, 
        errorMessage => {
          $scope.isLoading = '';
          $scope.showErrorNotif(errorMessage.data);
        });
      }

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