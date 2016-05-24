(function() {
  'use strict';

  angular.module('bracket')
    .factory('bracketService', bracketFactory);

    bracketFactory.$inject = ['$http', '$log'];

    function bracketFactory($http, $log) {
      console.log('in bracket service')



      return {

      }

    }

}());
