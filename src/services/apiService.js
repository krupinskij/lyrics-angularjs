app.factory('$lyricsApi', ['$http', function($http) {
  const $lyricsApi = {};

  $lyricsApi.get = (songTitle, bandName) => {
    return $http.get(`https://api.lyrics.ovh/v1/${bandName}/${songTitle}`, { 
      timeout: 10000, 
      transformResponse: resp => { 
        const data = JSON.parse(resp);
        return data || "Song not found"; 
      }
    })
  }

  return $lyricsApi;
}])