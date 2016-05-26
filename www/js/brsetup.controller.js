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
      bracketService.populateBracket(vm.bracket.name, vm.user.name, create)
      .then(function () {
        $state.go('bracket', {bracket_name: vm.bracket.name})
      }).then(function(){
        vm.beenClicked = false;
      })
    }


    vm.setPlayerName = function () {

      vm.beenClicked = true;
      var join = 'join';
      bracketService.populateBracket($stateParams.bracketName, vm.user.name, join)
      .then(function () {
        $state.go('bracket', {bracket_name: $stateParams.bracketName})
      }).then(function(){
        vm.beenClicked = false;
      })
    }

    vm.setBracketName = function() {
      vm.beenClicked = true;

      return $http.get('https://damp-eyrie-43620.herokuapp.com/api/v1/bracket/' + vm.bracket.name)
      .then(function (response) {
        if(response.status === 200) {

          $state.go('choose-player-name', {bracketName: vm.bracket.name});
        } else {
        }
      }).then(function(){
        vm.beenClicked = false;
      })
    }
  }
}());
