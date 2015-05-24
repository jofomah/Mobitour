'use strict';

angular
    .module('user')
    .directive('validatePreference', function (Config) {

      function isValid(value) {
        return (value === Config.LOW || value === Config.MEDIUM ||
        value === Config.HIGH || value === Config.VHIGH );
      }

      return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
          ctrl.$validators.string = function (modelValue, viewValue) {
            return isValid(viewValue);
          };
        }
      };
    })
    .directive('validateUsername', function ($q, $timeout) {
      return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {

          function usernameExists(username) {
            var delay = 1000;
            return $timeout(function () {
              if (username === 'jofomah') {
                return $q.reject(true);
              }
              return $q.when(false);
            }, delay);
          }

          ctrl.$asyncValidators.username = function (modelValue, viewValue) {
            return usernameExists(viewValue);
          };

        }
      };
    });
