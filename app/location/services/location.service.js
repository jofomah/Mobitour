'use strict';

angular
		.module('location')
		.service('locationService', function (dbService, $q, recommenderService, BOUND) {

			var _this = this;
			var byType = 'locations/by-type';
			var userLocDocType = 'user-location-rating';
			var ratedByUser = 'locations/rating-by-user';

			_this.getByType = function (type) {
				var params = {
					key: type,
					include_docs: true
				};
				return dbService.getView(byType, params)
						.then(dbService.pluckDocs);
			};

			_this.setScore = function (locs) {
				//TODO: move this to view
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
									//TODO: move to view and use user score to set start and end key
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

			_this.rateByUser = function(locId, username, rating){
				var id = [locId, username].join('-');
				var doc = {
					_id: id,
					doc_type: userLocDocType,
					locationId: locId,
					username: username,
					rating: rating
				};
				return dbService.save(doc);
			};

			_this.getLocationRatedBy = function(username){
				var params = {
					key: username,
					include_docs: true
				};
				return dbService.getView(ratedByUser, params)
						.then(dbService.pluckDocs);
			};

			_this.calcAvgRatings = function(locationRatings){
				var locAvgRatings = {};
				locationRatings.forEach(function(locRating) {
					var temp = locAvgRatings[locRating.locationId];
					if(temp && angular.isNumber(temp.sum)){
						temp.sum += locRating.rating;
						temp.count = temp.count + 1;
						locAvgRatings[locRating.locationId] = temp;
					}else {
						temp = {
							sum: locRating.rating,
							count: 1
						};
						locAvgRatings[locRating.locationId] = temp;
					}
					locAvgRatings[locRating.locationId].avg = temp.sum / temp.count;
				});
				return locAvgRatings;
			};

			_this.mapRatingByLocation = function(ratings) {
				var locRatingMap = [];
				var index = ratings.length;
				var rating;
				while(index --){
					rating = ratings[index];
					locRatingMap[rating.locationId] = rating;
				}
				return locRatingMap;
			};

			_this.getByIds = function(keys){
				var params = {
					keys: keys,
					include_docs: true
				};
				return dbService.allDocs(params);
			};

		});
