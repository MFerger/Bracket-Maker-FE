(function() {
  'use strict';

  angular.module('bracket')
    .directive('bmBracket', bracketDirective);

    function bracketDirective() {
      return {
        restrict: "E",
        scope: {},
        templateUrl: "../templates/bracket.html",
        controller: bracketController,
        controllerAs: "vm"
      }
    }

    bracketController.$inject = ['$log', 'bracketService'];

    function bracketController($log, bracketService) {
      var vm = this;
      console.log('in bracket directive')

    }

}());
