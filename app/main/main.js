'use strict';
angular
    .module('main', [
      'ionic',
      'ngCordova',
      'ui.router',
      'recommender',
      'user',
      'location'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {

      //default home
      $urlRouterProvider.otherwise('/home');

      // some basic routing
      $stateProvider
          .state('home', {
            url: '/home',
            cache: false,
            templateUrl: 'main/templates/home.html',
            controller: 'MainCtrl as mainCtrl',
            resolve: {
              userProfile: function (userService, $state) {
                return userService.getUserProfile()
                    .catch(function (err) {
                      $state.go('userPref');
                      return err;
                    });
              }
            }
          })
          .state('userPref', {
            url: '/user-pref',
            templateUrl: '../user/templates/user-pref.html',
            controller: 'UserPrefCtrl as userCtrl',
            resolve: {
              userProfile: function (userService, $q) {
                return userService.getUserProfile()
                    .catch(function () {
                      return $q.when({});
                    });
              }
            }
          });

    });
