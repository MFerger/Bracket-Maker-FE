(function() {
  'use strict';

  angular.module('bracket')
  .controller('BrSetupController', brsetupController);

  brsetupController.$inject = ['bracketService','$state', '$http', '$stateParams', '$scope', '$location', '$ionicNavBarDelegate']

  function brsetupController(bracketService, $state, $http, $stateParams, $scope, $location, $ionicNavBarDelegate) {
    var vm = this;
    vm.bracket = bracketService.bracket;
    vm.beenClicked = false;

    vm.bracket = {};
    if ($stateParams.bracketName) {
      vm.bracket.name = $stateParams.bracketName;
    }
    vm.getBracketName = function(){
      vm.beenClicked = true;
      var create = 'create';
      if (vm.bracket.name){
      bracketService.populateBracket(vm.bracket.name, vm.user.name, create)
      .then(function (res) {
        $state.go('bracket', {bracket_name: vm.bracket.name})
      }).then(function(){
        vm.beenClicked = false;
      })
    } else {
      vm.beenClicked = false;
    }
    }


    vm.setPlayerName = function () {
      vm.beenClicked = true;
      var join = 'join';
      if (vm.user){
      bracketService.populateBracket($stateParams.bracketName, vm.user.name, join)
      .then(function () {
        $state.go('bracket', {bracket_name: $stateParams.bracketName}, {reload: true})
      }).then(function(){
        vm.beenClicked = false;
        vm.user.name = "";
      })
    } else {
      $state.go('bracket', {bracket_name: $stateParams.bracketName}, {reload: true})
      vm.beenClicked = false;
      }
    }

    vm.setBracketName = function() {
      vm.beenClicked = true;

      return $http.get('https://damp-eyrie-43620.herokuapp.com/api/v1/bracket/' + vm.bracket.name)
    .then(function (response) {
      console.log("response from api:", response)
        if(response && response.status === 200) {
          $state.go('choose-player-name', {bracketName: vm.bracket.name});
        } else {
          vm.bracket.name = ""
          $state.go('search-bracket-name')

        }
      }).then(function(){
        vm.beenClicked = false;
      })
    }
  }
}());
