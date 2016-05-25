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
          return $http.post('https://damp-eyrie-43620.herokuapp.com/api/v1/bracket/'+ method, {
            bracket_name: bracketName,
            user_name: userName
          })
          .then(function (response) {
            if(response.status === 200){
              return $http.get('https://damp-eyrie-43620.herokuapp.com/api/v1/bracket/' + bracketName)
            }
          })
          .then(function (response) {
            console.log('get response', response);
            console.log('before it is set', brackets);
            if(response.status === 200){
              brackets[response.data._id]
              return response.data;
              console.log('after it is set', brackets);
            }
          })
    }
  }
}());
