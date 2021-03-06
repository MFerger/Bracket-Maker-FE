// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('bracket', ['ionic','ionic.service.core'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push('ehInterceptor');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  // $state.transitionTo($state.current, $state.$current.params, { reload: true, inherit: true, notify: true });//reload


  $stateProvider

  // setup an abstract state for the tabs directive
  .state('home', {
    url: '/',
    templateUrl: 'templates/homePage.html',
    controller: 'BrSetupController',
    controllerAs: 'vm'
  })
  .state('create-bracket-name', {
    url: '/create',
    templateUrl: 'templates/create-bracket-name.html',
    controller: 'BrSetupController',
    controllerAs: 'vm'
  })
  .state('choose-player-name', {
    url: '/:bracketName/player/add',
    templateUrl: 'templates/choose-player-name.html',
    controller: 'BrSetupController',
    controllerAs: 'vm'
  })
  .state('bracket', {
    cache: false,
    url: '/bracket/:bracket_name',
    templateUrl: "templates/bracket.html",
    controller: 'bracketController',
    controllerAs: 'vm',
  })
  .state('search-bracket-name', {
    url: '/searchbracket',
    templateUrl: 'templates/search-bracket-name.html',
    controller: 'BrSetupController',
    controllerAs: 'vm'
  })
  .state('round-details', {
    url: '/rounddetails/:player1_id/:player2_id/:bracket_name/:round',
    templateUrl: 'templates/round-details.html',
    controller: 'bracketController',
    controllerAs: 'vm'
  })
  .state('winner', {
    url: '/winner/:winnerName',
    templateUrl: 'templates/winner.html',
    controller: 'bracketController',
    controllerAs: 'vm'
  })
  .state('error', {
    url: "/error/:message",
    templateUrl: 'templates/error.html',
    controller: 'error',
    controllerAs: 'vm'
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

})

.factory('ehInterceptor', ehInterceptor)



.controller('appController', appController)
function appController ($scope, $location, $ionicNavBarDelegate){
  var vm = this;
  vm.disableBackButton = function(){
    var path = $location.path();
    console.log("path:", path);
    if (path.indexOf('bracket') !=-1){
      console.log("This log means bracket is in the path");
      vm.bracketView = true;
    }  else {
      console.log("This log means bracket is not in the path");
      vm.bracketView = false;
    }
  }
}

// ehInterceptor.$inject = ['$log', '$state'];

function ehInterceptor ($log, $injector, $location) {
  return {
    responseError: function (response) {
      if (response.status >= 400 ){
        console.log('first inter', response);
        // $injector.get('$state').go('error')
        $location.path('/error');
        alert ("ERROR: \n" + response.data.error)

      }
    //   if (response.status >= 403 ){
    //     // $injector.get('$state').go('error')
    //     $location.path('/error');
    //     alert ("ERROR: \n" + response.data.error)
    //     // return response;
    //   }
    //
  },
    response: function(response){
      // console.log('response in interceptor', response);
      if (response.data.error) {
        console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGG');
        // $location.path('/error');

        $injector.get('$state').go('error', {message: response.data.error});
        return response;
      } else {
        return response;
      }
    }
  }
}
