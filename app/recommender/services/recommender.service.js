'use strict';

angular.module('recommender')
		.service('recommenderService', function (PROBABILITY_DIST, PREFERENCE_WEIGHT) {

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
		});
