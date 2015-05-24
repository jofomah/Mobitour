'use strict';

angular
    .module('user')
    .service('userService', function (dbService) {

      var _this = this;
      var USER_ID = 'CURRENT_USER_PROFILE';

      _this.save = function (userDoc) {
        userDoc._id = USER_ID;
        userDoc.doc_type = 'user_preference';
        return dbService.save(userDoc);
      };

      _this.getUserProfile = function () {
        return dbService.get(USER_ID);
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
