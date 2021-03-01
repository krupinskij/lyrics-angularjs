const app = angular.module('app', [
  'ngRoute'
]);

app.config([
  '$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', { templateUrl: '/views/home-page.html' })
      .when('/new', { templateUrl: '/views/new-song-page.html' })
      .when('/song/:bandName/:songName', { templateUrl: '/views/song-page.html' })
      .when('/songs/:bandName?', { templateUrl: '/views/songs-page.html' })
      .when('/bands/:bandName?', { templateUrl: '/views/bands-page.html' })
      .when('/settings', { templateUrl: '/views/settings-page.html' })
      .otherwise({ redirectTo: '/' })
  }
]);

app.controller('pageController', function($scope, $router, $localStorage) {
  this.$onInit = () => {
    const param = $router.getPathParams()
    const theme = {
      primaryTheme: $localStorage.get('primary-theme') || 'is-primary',
    }

    Object.assign($scope, param, { theme })
  }
})