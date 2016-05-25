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

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    // url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
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
    url: '/bracket/:bracket_name',
    templateUrl: "templates/bracket.html",
    controller: 'bracketController',
    controllerAs: 'vm'
  })
    .state('search-bracket-name', {
    url: '/searchbracket',
    templateUrl: 'templates/search-bracket-name.html',
    controller: 'BrSetupController',
    controllerAs: 'vm'
  })
    .state('round-details', {
    url: '/rounddetails',
    templateUrl: 'templates/round-details.html'
  })



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
