'use strict';

angular.module('twitterRecolector')
  .controller('HomeCtrl', function ($http,$scope,Socket) {

    var vm = this;

    this.tweets = [];

    $http.get('/api/tweets').success(function (res) {
      vm.tweets = res;
      Socket.syncModel('tweet', vm.tweets);
    });

    vm.delete = function (id) {
      $http.delete('/api/tweets' + id);
    };

    $scope.$on('$destroy', function () {
      Socket.unsyncModel('tweet');
    });

  });
