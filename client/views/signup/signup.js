'use strict';

angular.module('twitterRecolector')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/signup', {
        templateUrl: 'views/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'vm'
      });
  });
