'use strict';

angular
    .module('user')
    .service('userService', function (dbService, $q) {

      var _this = this;
      var USER_ID = 'benjocyb2k'; //'jofomah';
      //TODO: pull

      _this.save = function (userDoc) {
        userDoc._id = userDoc.username;
        userDoc.doc_type = 'user_preference';
        return dbService.save(userDoc);
      };

      _this.getUserProfile = function () {
        return dbService.get(USER_ID)
            .then(function(user){
              if(user._id){
                return user;
              }
              return $q.reject({ error: 404, msg: 'User object does not have an _id property'});
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

      _this.getUserRatings = function(username) {
        var options = {
          key: username,
          include_docs: true
        };
        var view = 'locations/rating-by-user';
        return dbService.getView(view, options)
            .then(dbService.pluckDocs);
      };

      this.allRatings = function(){
        var options = {
          include_docs: true
        };
        var view = 'locations/user-ratings';
        return dbService.getView(view, options)
            .then(dbService.pluckDocs);
      };

      _this.getAvgRating = function(userRatings){
        var userAvgRatingInfo = {};
        userRatings.forEach(function(userRating) {
          var temp = userAvgRatingInfo[userRating.username];
          if(temp && angular.isNumber(temp.sum)){
            temp.sum += userRating.rating;
            temp.count += 1;
            userAvgRatingInfo[userRating.username] = temp;
          }else {
            temp = {
              sum: userRating.rating,
              count: 1
            };
            userAvgRatingInfo[userRating.username] = temp;
          }
          userAvgRatingInfo[userRating.username].avg = temp.sum / temp.count;
        });
        return userAvgRatingInfo;
      };

      /**
       * Similar users are users that have rated @param userRatedLocations
       * @param userRatedLocations - Array of id of locations rated by a user.
       */
      _this.getSimilarUserRatings = function(username, userRatedLocations) {
        var userRatings = 'locations/user-ratings';
        var options = {
          keys: userRatedLocations,
          include_docs: true
        };
        return dbService.getView(userRatings, options)
            .then(dbService.pluckDocs)
            .then(function(rows){
              return rows.filter(function(row){
                return row.username !== username;
              });
            });
      };

      _this.collateUserRatings = function(ratings) {
        var users = {};
        ratings.forEach(function(rating) {
          if(!angular.isArray(users[rating.username])){
            users[rating.username] = [];
          }
          users[rating.username].push(rating);
        });
        return users;
      };

      _this.mapUserRatings = function(username, userRatings) {
        var userRatingMap = {};
        userRatingMap[username] = {};
        userRatings.forEach(function(rating){
          if(username === rating.username){
            userRatingMap[username][rating.locationId] = rating;
          }
        });
        return userRatingMap;
      };

      _this.locationRatingUserMap = function(ratings) {
        var locationUserMap = {};
        var index = ratings.length;
        var rating;
        while(index --){
          rating = ratings[index];
          var username = rating.username;
          if(!locationUserMap[rating.locationId]){
            locationUserMap[rating.locationId]= [];
          }
          if(locationUserMap[rating.locationId].indexOf(username) === -1){
            locationUserMap[rating.locationId].push(username);
          }
        }
        return locationUserMap;
      };

      _this.ratedSameLocation = function(locationUserMap, locId, user1, user2){
        if(!angular.isArray(locationUserMap[locId])){
          return false;
        }
        return locationUserMap[locId].indexOf(user1) !== -1 && locationUserMap[locId].indexOf(user2) !== -1;
      };

      _this.computeSimilarUsers = function(ratings){
        var index = ratings.length;
        var locationUserMap = this.locationRatingUserMap(ratings);
        var rating;
        var similarityMap = {};
        while(index --){
          rating = ratings[index];
          if(!similarityMap[rating.username]){
            similarityMap[rating.username] = {};
          }
          var otherRating;
          for(var i in ratings){
            otherRating = ratings[i];
            var otherUsername = otherRating.username;
            if(otherUsername === rating.username){
              continue; //skip if same user as outer loop
            }
            if(!similarityMap[rating.username][otherUsername]){
              similarityMap[rating.username][otherUsername] = [];
            }
            var ratedSameLocation = _this.ratedSameLocation(locationUserMap, rating.locationId, rating.username, otherUsername);
            if(ratedSameLocation && similarityMap[rating.username][otherUsername].indexOf(rating.locationId) === -1){
              similarityMap[rating.username][otherUsername].push(rating.locationId);
            }
          }
        }
        return similarityMap;
      };

    });
