(function() {
  'use strict';

  angular.module('bracket')
    .controller('bracketController', bracketController);

    // function bracketDirective() {
    //   return {
    //     restrict: "E",
    //     scope: {},
    //     templateUrl: "../templates/bracket.html",
    //     controller: bracketController,
    //     controllerAs: "vm"
    //   }
    // }

    bracketController.$inject = ['$log', 'bracketService', '$http', '$stateParams', '$state', '$window', '$scope', '$location', '$ionicNavBarDelegate'];

    function bracketController($log, bracketService, $http, $stateParams, $state, $window, $scope, $location, $ionicNavBarDelegate) {
      var vm = this;
      console.log('state params', $stateParams);
      $http.get('https://damp-eyrie-43620.herokuapp.com/api/v1/bracket/' + $stateParams.bracket_name).then(function(bracket){
        vm.bracket = bracket.data;
      })
      

      vm.refresh = function(){
        console.log("should be refreshing if you see this");
          $window.location.reload();  }

    }

}());
