'use strict';

angular
		.module('location')
		.service('locationService', function (LOCATIONS, $q, recommenderService, BOUND) {

			var _this = this;

			function filterByType(docs, type) {
				return docs.filter(function (loc) {
					return loc.type.toLowerCase() === type.toLowerCase();
				});
			}

			_this.getByType = function (type) {
				return getAll()
						.then(function (locs) {
							return filterByType(locs, type);
						});
			};

			function getAll() {
				return $q.when(LOCATIONS.FIXTURE);
			}

			_this.setScore = function (locs) {
				function attachScore(loc) {
					var p = loc.preferences;
					loc.score = recommenderService.getBayesianScore(p.budget, p.size, p.cultural);
					return loc;
				}
				return locs.map(attachScore);
			};

			_this.getBy = function (type, userScore) {
				return _this.getByType(type)
						.then(_this.setScore)
						.then(function (locs) {
							return locs
									.filter(function (loc) {
										var lower = userScore - BOUND.LOWER;
										var upper = userScore + BOUND.UPPER;
										return (lower <= loc.score && loc.score <= upper);
									})
									.sort(function (locA, locB) {
										var user = { score: userScore };
										return recommenderService.distanceBtw(user, locA) - recommenderService.distanceBtw(user, locB);
									})
									.slice(0, 5); //take first 5
						});
			};

		});
