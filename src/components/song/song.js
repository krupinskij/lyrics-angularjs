app.directive('song', [() => {
  return {
    restrict: 'E',
    templateUrl: '/components/song/song.html',
    controller: ($scope, $http, $location) => {
      [$scope._, $scope.host, $scope.bandName, $scope.songName] = $location.path().split('/');
      $scope.isHidden = 'is-hidden';
      $scope.isProgress = true;
      
      $http.get(`https://api.lyrics.ovh/v1/${$scope.bandName}/${$scope.songName}`)
        .then(resp => {
          $scope.isProgress = false;
          $scope.lyrics = resp.data.lyrics;
        }, () => {
          $scope.isProgress = false;
          $scope.showNotif();
        });

        $scope.showNotif = () => {
          $scope.isHidden = '';
        }
  
        $scope.hideNotif = () => {
          $scope.isHidden = 'is-hidden';
        }
    }
  }
}])