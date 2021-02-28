app.directive('search', [() => {
  return {
    restrict: 'E',
    templateUrl: '/components/search/search.html',
    controller: ($scope, $location, $database, $lyricsApi) => {
      $scope.isLoading = '';
      $scope.isHidden = 'is-hidden';
      $scope.message = '';
      $scope.isErrorHidden = 'is-hidden';
      $scope.errorMessage = '';

      $scope.find = () => {
        $scope.isLoading = 'is-loading';
        $lyricsApi.get($scope.songTitle, $scope.bandName)
        .then(() => {
          $scope.isLoading = '';

          $database.save({ title: $scope.songTitle, band: $scope.bandName })
            .then(message => {
              $scope.message = message;
              $scope.showNotif();

              $location.path(`/song/${$scope.bandName}/${$scope.songTitle}`)
            },
            errorMessage => {
              $scope.errorMessage = errorMessage;
              $scope.showErrorNotif();
            });
        }, 
        errorMessage => {
          $scope.isLoading = '';
          $scope.errorMessage = errorMessage.data;
          $scope.showErrorNotif();
        });
      }

      $scope.showNotif = () => { $scope.isHidden = ''; }
      $scope.hideNotif = () => { $scope.isHidden = 'is-hidden'; }

      $scope.showErrorNotif = () => { $scope.isErrorHidden = ''; }
      $scope.hideErrorNotif = () => { $scope.isErrorHidden = 'is-hidden'; }
    }
  }
}])