(function() {
  'use strict';

  angular.module('bracket')
  .controller('error', error);

  error.$inject = ['bracketService','$state', '$http', '$stateParams', '$scope', '$location', '$ionicNavBarDelegate']

  function error(bracketService, $state, $http, $stateParams, $scope, $location, $ionicNavBarDelegate) {
    var vm = this;
    vm.errormsg = $stateParams.message
  }

}());
