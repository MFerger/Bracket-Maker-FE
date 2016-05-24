(function() {
  'use strict';

  angular.module('bracket')
    .factory('bracketService', bracketFactory);

    bracketFactory.$inject = ['$http', '$log'];

    function bracketFactory($http, $log) {
      var _bracket = {
        id: 897412309487132,
        name: 'Toast',
        player1: 'Player 1',
        player2: 'Player 2',
        player3: 'Mike',
        player4: 'Player 4',
        player5: 'Player 5',
        player6: 'Player 6',
        player7: 'Player 7',
        player8: 'Player 8',
      }



      return {
        bracket: _bracket

      }

    }

}());
