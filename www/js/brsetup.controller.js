(function() {
  'use strict';

  angular.module('bracket')
  .controller('BrSetupController', brsetupController);

  brsetupController.$inject = ['bracketService']

  function brsetupController(bracketService) {
    var vm = this;
    vm.bracket = bracketService.bracket;
    
    console.log('in brsetupController', vm)
  }

}());
