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
      console.log('clicked???', vm.beenClicked);
      vm.beenClicked = true;
      var create = 'create';
      bracketService.populateBracket(vm.bracket.name, vm.user.name, create)
      .then(function () {
        $state.go('bracket', {bracket_name: vm.bracket.name})
      })
    }


    vm.setPlayerName = function () {
      console.log('clicked???', vm.beenClicked);
      console.log('bracket name should be:', $stateParams.bracketName);
      vm.beenClicked = true;
      var join = 'join';
      bracketService.populateBracket($stateParams.bracketName, vm.user.name, join)
      .then(function () {
        $state.go('bracket', {bracket_name: $stateParams.bracketName})
      })
    }

    vm.setBracketName = function() {
      console.log('clicked???', vm.beenClicked);
      vm.beenClicked = true;

      return $http.get('https://damp-eyrie-43620.herokuapp.com/api/v1/bracket/' + vm.bracket.name)
      .then(function (response) {
        if(response.status === 200) {
          console.log("current bracket name:", vm.bracket.name);

          $state.go('choose-player-name', {bracketName: vm.bracket.name});
        } else {
          console.log('it shouldnt get here');
        }
      })
    }
  }
}());
