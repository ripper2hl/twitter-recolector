(function(){
    'use strict';

    var app = angular.module('tuitRecolector',[]);

    app.controller('tuitsRecolectorController', function($scope,$http){

        $http.get('/api/tuits').success(function(data) {
            $scope.tuits = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

        $scope.currentTuit = {};
        $scope.view = 1;

        $scope.changeView = function (val) {
            $scope.view = val;
        };

        $scope.tuitList = function(){
          $http.get('/api/tuits').success(function(data) {
              $scope.tuits = data;
              console.log(data)
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
        }

        $scope.tuitDetail = function(id){
          $http.get('/api/tuits/' + id).success(function(data) {
              console.log(data);
              $scope.currentTuit = data;
              $scope.words = data.status.split(' ');
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
        };
    });
})();
