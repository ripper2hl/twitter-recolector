'use strict';

angular.module('twitterRecolector')
  .controller('WordsCtrl', function (Word,$scope, $timeout, $mdSidenav, $mdUtil, $log) {

    var vm = this;
    angular.extend(vm, {
      name: 'WordsCtrl'
    });

    vm.word = {};
    vm.word.name = "";
    vm.word.score = "";
    vm.words = Word.query();

    vm.addWord = function (word){
      Word.save(vm.word).
      $promise.then(function(){
        vm.word = {};
      });
    }

    vm.selectWord = function (word){
      vm.word.name = word.name;
      vm.word.score = word.score;
      vm.toggleRight();
    }

    vm.toggleRight = buildToggler('right');

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle()
              .then(function () {
                $log.debug("toggle " + navID + " is done");
              });
          },1);
      return debounceFn;
    }

  });
