const app = angular.module('app', [
  'ngRoute'
]);

app.config([
  '$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider
      .when('/', { templateUrl: '/views/home-page.html' })
      .when('/new', { templateUrl: '/views/new-song-page.html' })
      .when('/song/:bandName/:songName', { templateUrl: '/views/song-page.html' })
      .when('/songs/:bandName?', { templateUrl: '/views/songs-page.html' })
      .when('/bands/:bandName?', { templateUrl: '/views/bands-page.html' })
      .otherwise({ redirectTo: '/' })
  }
]);

app.controller('pageController', ['$scope', '$router', function($scope, $router) {
  this.$onInit = () => {
    const pathParams = $router.getPathParams()
    Object.assign($scope, pathParams);
  }
}])