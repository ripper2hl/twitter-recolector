'use strict';

angular.module('twitterRecolector')
  .controller('HomeCtrl', function ($scope,Tweet,Socket) {

    var vm = this;
    this.tweets = [];
    this.allTweets = [];

    vm.loadMore = function (){
      if(vm.allTweets.length > 0){
        vm.tweets.push(vm.allTweets.pop());
      }
    }

    Tweet.query()
    .$promise.then(function (listTweets) {
      vm.tweets[0] = listTweets.pop();
      vm.tweets[1] = listTweets.pop();
      vm.allTweets = listTweets;
    });

    Socket.syncModel('tweets', vm.tweets);


    vm.delete = function (id) {
    };

    $scope.$on('$destroy', function () {
      Socket.unsyncModel('tweet');
    });

  });
