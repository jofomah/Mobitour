'use strict';

angular
    .module('main')
    .controller('MainCtrl', function ($state, userProfile, recommenderService, locationService) {

      if (!userProfile) {
        return $state.go('userPref');
      }

      var vm = this;
      vm.placeType = '';
      var prefs = angular.copy(userProfile.preferences);
      var userScore = recommenderService.getBayesianScore(prefs.budgetRange, prefs.peopleSizePerTime, prefs.visitorType);
      console.log(userScore);
      vm.locations = [];

      this.locTypes = [
        {name: 'Bar', code: 'bar'},
        {name: 'Hotel', code: 'hotel'},
        {name: 'Super market', code: 'super-market'},
        {name: 'Scenic sight', code: 'scenic-sight'}
      ];

      vm.getRecommendation = function (isValidForm) {
        if (vm.placeType) {
          locationService.getBy(vm.placeType, userScore)
              .then(function(recommendedLocations){
                vm.locations = recommendedLocations;
              })
              .catch(function(err){
                console.log(err);
              });
        }
        console.log(vm.locations);
      };

    });
