app.factory('$router', ['$location', function($location) {
  const $router = {};

  $router.getPathParams = () => {
    const pathSegments = $location.path().split('/');

    switch(pathSegments[1]) {
      case 'songs':
        return {
          bandName: pathSegments[2]
        }
    }
  }

  return $router;
}])