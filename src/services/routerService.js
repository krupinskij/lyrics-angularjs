app.factory('$router', ['$location', function($location) {
  const $router = {};

  $router.getPathParams = () => {
    const pathSegments = $location.path().split('/');

    switch(pathSegments[1]) {
      case 'songs':
      case 'bands':
        return {
          bandName: pathSegments[2]
        }
      case 'song':
        return {
          bandName: pathSegments[2],
          songTitle: pathSegments[3]
        }
    }
  }

  return $router;
}])