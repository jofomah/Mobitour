'use strict';

angular.module('recommender')
		.service('recommenderService', function (PROBABILITY_DIST, PREFERENCE_WEIGHT, userService) {

			var _this = this;

			_this.getProbabilityDistributionByBudgetRange = function (budget) {
				return PROBABILITY_DIST[budget.toUpperCase()];
			};

			this.getBayesianScore = function (budgetRange, peopleSize, visitorType) {
				var probDist = _this.getProbabilityDistributionByBudgetRange(budgetRange);
				if (angular.isObject(probDist)) {
					var budgetPart = PREFERENCE_WEIGHT.BUDGET_RANGE * probDist[budgetRange.toUpperCase()];
					var peoplePart = PREFERENCE_WEIGHT.PEOPLE_SIZE * probDist[peopleSize.toUpperCase()];
					var visitorTypePart = PREFERENCE_WEIGHT.CULTURAL * probDist[visitorType.toUpperCase()];
					return budgetPart + peoplePart + visitorTypePart;
				}
				return false;
			};

			this.distanceBtw = function (p1, p2) {
				return Math.sqrt(Math.pow(p1.score - p2.score, 2) + Math.pow(p1.score - p2.score, 2));
			};

			_this.collatePrediction = function(locPrediction){
				var locPred = [];
				for(var locId in locPrediction){
					locPred.push([locId, locPrediction[locId]]);
				}
				locPred.sort(function(r1, r2) {
					return r2[1] - r1[1];
				});
				var max = 5;
				if(locPred.length > max){
					return locPred.slice(0, max);//
				}
				return locPred;
			};

			_this.spearmanPrediction = function(username, similarityMatrix, locations, similarUserRatings, ratingByLocMap, allRatings){
				var usersAvgRatings = userService.getAvgRating(allRatings);
				var result = usersAvgRatings[username];
				var userAvg = 0;
				if((result && result.avg)){
					userAvg = result.avg;
				}

        if(userAvg === 0){
	        return {};
        }

				var resultMap = {};
				var locId;
				for(var i in locations){
					locId = locations[i]._id;
					var userLoc = 0;
					var locTotal = 0;
					var similaritySum = 0;
					for(var user in similarUserRatings){
						if(username === user){
							continue; //skip
						}
						var locRating = ratingByLocMap[locId];
						var similarUserAvgRating = usersAvgRatings[user].avg;

						if(locRating && locRating.username === user){
							var sim = similarityMatrix[username][user];
							userLoc = (locRating.rating - similarUserAvgRating) * sim;
							similaritySum += Math.abs(sim);
						}
						locTotal += userLoc;
					}
					if(similaritySum === 0){
						continue;
					}
					resultMap[locId] = userAvg + (locTotal / similaritySum);
				}
        return resultMap;
			};

		});
