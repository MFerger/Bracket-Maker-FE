(function() {
  'use strict';

  angular.module('bracket')
  .controller('BrSetupController', brsetupController);

  brsetupController.$inject = []

  function brsetupController() {
    var vm = this;
    console.log('in brsetupController')
  }

}());
