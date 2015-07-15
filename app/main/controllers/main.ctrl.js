'use strict';

angular
		.module('main')
		.controller('MainCtrl', function ($scope, userService, $state, $ionicPopup, userProfile,
                                      recommenderService, locationService, $q) {

			var vm = this;
			vm.placeType = '';
			vm.ratings = {};

			var prefs = angular.copy(userProfile.preferences);
			var userScore = recommenderService.getBayesianScore(prefs.budgetRange, prefs.peopleSizePerTime, prefs.visitorType);
			vm.locations = [];
			vm.userLocationRatings = [];

			this.locTypes = [
				{name: 'Bar', code: 'bar'},
				{name: 'Hotel', code: 'hotel'},
				{name: 'Super market', code: 'super-market'},
				{name: 'Scenic sight', code: 'scenic-sight'}
			];

			function setLocations(recommendedLocations) {
				vm.locations = recommendedLocations;
				return locationService.getLocationRatedBy(userProfile.username)
						.then(function (userLocRatings) {
							vm.userLocationRatings = userLocRatings;
							var userLocRating;
							for (var i in vm.userLocationRatings) {
								userLocRating = vm.userLocationRatings[i];
								vm.ratings[userLocRating.locationId] = userLocRating.rating;
							}
						});
			}

			vm.disable = function (locId) {
				var locRating = vm.ratings[locId];
				return !(angular.isNumber(locRating) && locRating > 0);
			};

			function computeWeight(userRatingsMap, similarUserRatings, locationsAvgRating) {
				var result = 0;
				var nominator = 0;
				var denominator;
				var userOneDenom = 0;
				var userTwoDenom = 0;
				similarUserRatings.forEach(function (similarUserRating) {
					var locId = similarUserRating.locationId;
					var locAvg = locationsAvgRating[locId];
					var avgLocRating = (locAvg && angular.isNumber(locAvg.avg)) ? locAvg.avg : 0;
					var userLocRating = (userRatingsMap && userRatingsMap[locId] && angular.isNumber(userRatingsMap[locId].rating)) ? userRatingsMap[locId].rating : 0;
					var otherUserLocRating = similarUserRating.rating;
					var user1Temp = (userLocRating - avgLocRating);
					var user2Temp = (otherUserLocRating - avgLocRating);
					var temp = (userLocRating - avgLocRating) * (otherUserLocRating - avgLocRating);

					if (angular.isNumber(temp)) {
						nominator += temp;
						userOneDenom += Math.pow(user1Temp, 2);
						userTwoDenom += Math.pow(user2Temp, 2);
					}
				});
				denominator = (Math.sqrt(userOneDenom) * Math.sqrt(userTwoDenom));
				if (angular.isNumber(nominator) && denominator > 0) {
					result = nominator / denominator;
				}
				return result;
			}

			vm.getRecommendation = function () {
				var username = userProfile.username;
				var promises = [];
				promises.push(locationService.getByType(vm.placeType));
				promises.push(userService.allRatings());
				$q.all(promises)
						.then(function (res) {
							var locationTypes = res[0];
							var allUserRating = res[1];
							var similarityMatrix = {};
							var userWithSimilarRatings = userService.computeSimilarUsers(allUserRating);
							var locationsAvgRating = locationService.calcAvgRatings(allUserRating);
							var ratingsByUser = userService.collateUserRatings(allUserRating);
							var ratingByLocMap = locationService.mapRatingByLocation(allUserRating);

							var rowUser;
              for(var user in userWithSimilarRatings){
								rowUser = userWithSimilarRatings[user];
	              if(!similarityMatrix[user]){
		              similarityMatrix[user] = {};
		              similarityMatrix[user][user] = 1;
	              }
	              var userRatingMap = ratingsByUser[user];
	              for(var similarUser in rowUser){
		              if(similarityMatrix[user][similarUser]){
			              continue
		              }
		              var similarLocs = rowUser[similarUser];
		              var otherUserRatings = [];
		              if(angular.isArray(similarLocs)){
			              var locId;
			              for(var i in similarLocs){
				              locId = similarLocs[i];
				              var locRating = ratingByLocMap[locId];
				              if(angular.isObject(locRating)){
					              otherUserRatings.push(locRating);
				              }
			              }
		              }
		              if(otherUserRatings.length === 0){
			              continue;
		              }
		              var result = computeWeight(userRatingMap[user], otherUserRatings, locationsAvgRating);
		              similarityMatrix[user][similarUser] = result;
		              if(!similarityMatrix[similarUser]){
			              similarityMatrix[similarUser] = {};
			              similarityMatrix[similarUser][similarUser] = 1;
		              }
		              similarityMatrix[similarUser][user] = result;
	              }
              }

							var locPredictionScores = recommenderService.spearmanPrediction
							(
									username,
									similarityMatrix,
									locationTypes,
									userWithSimilarRatings,
									ratingByLocMap,
									allUserRating
							);
							var locIds = [];
							recommenderService.collatePrediction(locPredictionScores)
									.forEach(function (locPred) {
										locIds.push(locPred[0]);
									});


              locationService.getByIds(locIds)
		              .then(function(res){
			              console.info(res);
		              })
		              .catch(function(err){
			              console.error(err);
		              });

							console.warn(locIds);


						})
						.catch(function (err) {
							console.error(err);
						});

				if (vm.placeType) {
					locationService.getBy(vm.placeType, userScore)
							.then(setLocations)
							.catch(function () {
								vm.locations = [];
							})
					;
				}
			};

			vm.submitRating = function (locId) {
				var rating = vm.ratings[locId];
				locationService.rateByUser(locId, userProfile.username, rating)
						.then(function () {
							$ionicPopup.alert({
								title: 'Rating submitted successfully',
								template: 'Your location rating was submitted successfully!'
							});
						})
						.catch(function () {
							$ionicPopup.alert({
								cssClass: 'bar-assertive',
								title: 'Rating failed!',
								template: 'Please, check your internet setting and try again.'
							});
						});
			};

		});
