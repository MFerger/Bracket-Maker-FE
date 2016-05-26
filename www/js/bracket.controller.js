(function() {
  'use strict';

  angular.module('bracket')
    .controller('bracketController', bracketController);

    bracketController.$inject = ['$log', 'bracketService', '$http', '$stateParams', '$state'];
    function bracketController($log, bracketService, $http, $stateParams, $state) {
      var vm = this;
      if ($stateParams.player1_id && $stateParams.player2_id) {
        $http.get('https://damp-eyrie-43620.herokuapp.com/api/v1/player/' + $stateParams.player1_id).then(function(user1Obj){
          vm.player1 = user1Obj.data;
          $http.get('https://damp-eyrie-43620.herokuapp.com/api/v1/player/' + $stateParams.player2_id).then(function(user2Obj){
            vm.player2 = user2Obj.data;
          })
        })
      }

      if (!$stateParams.player1_id && !$stateParams.player2_id) {
        console.log('called again');
        $http.get('https://damp-eyrie-43620.herokuapp.com/api/v1/bracket/' + $stateParams.bracket_name).then(function(bracket){
          vm.bracket = bracket.data;
        })
      }

      vm.roundDetails = function (bracketName, player1, player2, round) {
        $state.go('round-details', {player1_id: player1._id, player2_id: player2._id, bracket_name: bracketName, round: round})
      }

      vm.selectWinner = function (winner) {
        console.log('bracket name, location, round', $stateParams.bracket_name, winner, $stateParams.round);
        $http.post('https://damp-eyrie-43620.herokuapp.com/api/v1/bracket/result', {
          bracket_name: $stateParams.bracket_name,
          initial_location: winner,
          round: $stateParams.round,
          result: true
        }).then(function(){
          $state.go('bracket', {bracket_name: $stateParams.bracket_name})
        })
      }


}());
