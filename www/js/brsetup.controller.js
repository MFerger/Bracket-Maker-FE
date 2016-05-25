(function() {
  'use strict';

  angular.module('bracket')
  .controller('BrSetupController', brsetupController);

  brsetupController.$inject = ['bracketService','$state', '$http']

  function brsetupController(bracketService, $state, $http) {
    var vm = this;
    vm.bracket = bracketService.bracket;

    var bracketName;

    vm.getBracketName = function(){
      var create = 'create';
      bracketService.populateBracket(vm.bracket.name, vm.user.name, create)
      .then(function () {
        $state.go('bracket')
      })
    }


    vm.setPlayerName = function () {
      var join = 'join';
      console.log(bracketName);
      bracketService.populateBracket(bracketName, vm.user.name, join)
    }

    vm.setBracketName = function() {
      bracketName = vm.bracket.name;
      return $http.get('https://damp-eyrie-43620.herokuapp.com/api/v1/bracket/' + bracketName)
        .then(function (response) {
          if(response.status === 200) {
            $state.go('choose-player-name');
          } else {
            console.log('it shouldnt get here');
          }
        })
    }

  }
}());
