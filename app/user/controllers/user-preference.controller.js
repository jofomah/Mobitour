'use strict';

angular
    .module('user')
    .controller('UserPrefCtrl', function (userService, $state, userProfile) {

      var vm = this;
      console.log(userProfile);

      if ( !userProfile.username || !angular.isObject(userProfile.preferences) ) {
        vm.username = '';
        vm.preferences = userService.getDefaultPreferences();
      } else {
        vm.username = userProfile.username;
        vm.preferences = userProfile.preferences;
      }

      vm.continue = function (isValidForm) {
        vm.isSaving = isValidForm;
        if (isValidForm) {
          userProfile = {
            username: vm.username,
            preferences: angular.copy(vm.preferences)
          };
          userService.save(userProfile)
              .then(function (res) {
                //log.success('userPrefSaved');
                $state.go('home');
              })
              .catch(function (err) {
                //log.error('saveUserProfileErr', err);
              })
              .finally(function () {
                vm.isSaving = false;
              });
        }
      };

    });
