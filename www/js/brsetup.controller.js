(function() {
  'use strict';

  angular.module('bracket')
  .controller('BrSetupController', brsetupController);

  brsetupController.$inject = ['bracketService','$state', '$http']

  function brsetupController(bracketService, $state, $http) {
    var vm = this;
    vm.bracket = bracketService.bracket;
    console.log('in brsetupControllerrrrrrrrrrrr', vm)

    vm.getBracketName = function(data) {
      console.log(data);
      return $http.post('https://damp-eyrie-43620.herokuapp.com/api/v1/bracket/create', {
        bracket_name: vm.bracket_name,
        user_name: vm.user_name
      })
        .then(function (response) {
          console.log(response);
          $state.go('bracket')
        })
      }

    var object = {
      bracket_name: '',
      user_name: ''
    }
    vm.setPlayerName = function () {
      object.user_name = vm.user.name;
    }

    vm.setBracketName = function() {
      object.bracket_name = vm.bracket.name;
      $state.go('choose-player-name({bracketName: vm.bracket.name})')
      // return $http.post('https://damp-eyrie-43620.herokuapp.com/api/v1/bracket/join', {
      //   bracket_name: vm.bracket_name,
      //   user_name: vm.user_name
      // })
      // console.log(object.bracket_name);
    }
  }
}());
