angular.module('app', [
  'ngRoute'
])
.config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', { templateUrl: 'views/home-page.html' })
      .when('/aaa', { templateUrl: 'views/home-page.html' })
  }
]);