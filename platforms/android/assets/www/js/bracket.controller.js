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

    bracketController.$inject = ['$log', 'bracketService'];

    function bracketController($log, bracketService) {
      var vm = this;
      vm.bracket = bracketService.bracket
      console.log('in bracket directive')

    }

}());
