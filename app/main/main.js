'use strict';
angular
    .module('main', [
      'ionic',
      'ngCordova',
      'ui.router',
      // TODO: load other modules selected during generation
    ])
    .config(function ($stateProvider, $urlRouterProvider) {

      //default home
      $urlRouterProvider.otherwise('/tab/location-pref');

      // some basic routing
      $stateProvider
          .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'main/templates/index.html',
          })
          .state('tab.locationPref', {
            url: '/location-pref',
            views: {
              'tab-location': {
                templateUrl: 'main/templates/tab-location.html',
                controller: 'LocationPrefCtrl as locCtrl'
              }
            }
          })
          .state('tab.userPref', {
            url: '/user-pref',
            views: {
              'tab-user': {
                templateUrl: 'main/templates/tab-user-pref.html'
              }
            }
          });

    });
