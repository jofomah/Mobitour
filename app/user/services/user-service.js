'use strict';

angular
    .module('user')
    .service('userService', function ($localForage, $q) {

      var _this = this;
      var USER_ID = 'CURRENT_USER_PROFILE';

      _this.save = function (userDoc) {
        return $localForage.setItem(USER_ID, userDoc);
      };

      _this.getUserProfile = function () {
        return $localForage.getItem(USER_ID)
            .then( function (userProfile) {
              if (!userProfile) {
                return $q.reject({ errorCode: 404, message: 'Document is missing.' });
              }
              return userProfile;
            });
      };

      _this.getDefaultPreferences = function () {
        var defaultPreferences = {
          budgetRange: '',
          visitorType: '',
          peopleSizePerTime: ''

        };
        return defaultPreferences;
      };

    });
