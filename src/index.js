const lyricsAngularJS = angular.module('lyrics-angularjs', []);

lyricsAngularJS.controller('my-songs', function mySongsController($scope) {
  $scope.bands = JSON.parse(localStorage.getItem('bands') || '') || [];

  $scope.deleteBand = id => {
    $scope.bands = $scope.bands.filter(band => band.id !== id);

    localStorage.setItem('bands', JSON.stringify($scope.bands));
  }

  $scope.deleteSong = (bandId, id) => {
    const currBand = $scope.bands.find(band => band.id === bandId);
    currBand.songs = currBand.songs.filter(song => song.id !== id);

    if(currBand.songs.length === 0) {
      $scope.bands = $scope.bands.filter(band => band.id !== bandId);
    }
    else {
      $scope.bands = $scope.bands.map(band => {
        if(band.id === bandId) return currBand;

        return band;
      })
    }

    localStorage.setItem('bands', JSON.stringify($scope.bands));
  }
});