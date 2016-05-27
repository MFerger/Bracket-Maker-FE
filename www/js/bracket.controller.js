(function() {
  'use strict';

  angular.module('bracket')
    .controller('bracketController', bracketController);

    bracketController.$inject = ['$log', 'bracketService', '$http', '$stateParams', '$state', '$window'];
    function bracketController($log, bracketService, $http, $stateParams, $state, $window) {
      var vm = this;
      vm.winnerDude = 'NOT poopp';
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

      vm.refresh = function(){
          $window.location.reload();  }

      vm.roundDetails = function (bracketName, player1, player2, round) {
        console.log('data from the object', player1);
        $state.go('round-details', {player1_id: player1._id, player2_id: player2._id, bracket_name: bracketName, round: round})
      }
      vm.roundDetails2 = function (players, clickLocation) {
        console.log('players: ', players);
        console.log('location: ', clickLocation);
        var playerArr = [];
        players.forEach(function (player) {
          switch (clickLocation) {
            case 1: console.log('case1');
              if (player.round1 && (player.initial_location === 'N1' || player.initial_location === 'N2' )) {
                console.log('playerz: ', player);
                playerArr.push(player);
              }
              if (player.round1 && (player.initial_location === 'N3' || player.initial_location === 'N4' )) {
                playerArr.push(player);
              }

            break;
            case 2: console.log('case1');
              if (player.round1 && (player.initial_location === 'S1' || player.initial_location === 'S2' )) {
                console.log('playerz: ', player);
                playerArr.push(player);
              }
              if (player.round1 && (player.initial_location === 'S3' || player.initial_location === 'S4' )) {
                playerArr.push(player);
              }

            break;
            default:

          }

        })

        $state.go('round-details', {player1_id: playerArr[0]._id, player2_id: playerArr[1]._id, bracket_name: playerArr[0].bracket_name, round: 'round2'})
      }
      vm.roundDetails3 = function (players, round) {
        console.log('players: ', players);
        var playerArr = [];
        players.forEach(function (player) {
          console.log('case1');
              if (player.round2 && (player.initial_location === 'N1' || player.initial_location === 'N2' || player.initial_location === 'N3' || player.initial_location === 'N4' )) {
                console.log('playerz: ', player);
                playerArr.push(player);
              }
              if (player.round2 && (player.initial_location === 'N1' || player.initial_location === 'N2' || player.initial_location === 'N3' || player.initial_location === 'N4' )){
                playerArr.push(player);

              }

        })

        $state.go('round-details', {player1_id: playerArr[0]._id, player2_id: playerArr[1]._id, bracket_name: playerArr[0].bracket_name, round: round})
      }

      vm.selectWinner = function (winner) {
        console.log('bracket name, location, round', $stateParams.bracket_name, winner, $stateParams.round);
        $http.post('https://damp-eyrie-43620.herokuapp.com/api/v1/bracket/result', {
          bracket_name: $stateParams.bracket_name,
          initial_location: winner,
          round: $stateParams.round,
          result: true
        }).then(function(){
          if($stateParams.round !== 'round3'){
            $state.go('bracket', {bracket_name: $stateParams.bracket_name})
          } else {

            $http.get('https://damp-eyrie-43620.herokuapp.com/api/v1/bracket/' + $stateParams.bracket_name).then(function(bracket){
              vm.bracket = bracket.data;
              console.log(vm.bracket);
              var winnerDude = vm.bracket.find(function (item) {
                return item.initial_location === winner
              })
              vm.winnerDude = winnerDude.user_name
              console.log('probz not working,', vm.winnerDude);
              $state.go('winner', {winnerName: vm.winnerDude})
            })
          }
        })
      }
      vm.addMorePlayers = function(){
        $state.go('choose-player-name', {bracketName: vm.bracket[0].bracket_name});

      }
}


}());
