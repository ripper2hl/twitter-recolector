'use strict';

angular.module('twitterRecolector')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/words', {
        templateUrl: 'views/words/words.html',
        controller: 'WordsCtrl',
        controllerAs: 'vm'
      });
  });
