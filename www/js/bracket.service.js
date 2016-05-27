(function() {
  'use strict';

  angular.module('bracket')
    .factory('bracketService', bracketFactory);

    bracketFactory.$inject = ['$http', '$log', '$state'];

    function bracketFactory($http, $log, $state) {
      var brackets = {}
      return {
        populateBracket: populateBracket,
        brackets: brackets
      }

      function populateBracket (bracketName, userName, method) {
        console.log('its the bracket name', bracketName);
          return $http.post('https://damp-eyrie-43620.herokuapp.com/api/v1/bracket/'+ method, {
            bracket_name: bracketName,
            user_name: userName
          }).then(function (res) {
            console.log("WHO EVEN KNOWS", res);

          })
        }
      }
}());
