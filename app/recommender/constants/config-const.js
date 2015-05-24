'use strict';

angular
		.module('recommender')
		.constant('PROBABILITY_DIST', {
			"LOW": {
				"LOW": 0.8,
				"MEDIUM": 0.13,
				"HIGH": 0.05,
				"VERY-HIGH": 0.02
			},
			"MEDIUM": {
				"LOW": 0.1,
				"MEDIUM": 0.8,
				"HIGH": 0.06,
				"VERY-HIGH": 0.04
			},
			"HIGH": {
				"LOW": 0.04,
				"MEDIUM": 0.06,
				"HIGH": 0.8,
				"VERY-HIGH": 0.08
			},
			"VERY-HIGH": {
				"LOW": 0.02,
				"MEDIUM": 0.05,
				"HIGH": 0.13,
				"VERY-HIGH": 0.8
			}
		})
		.constant('PREFERENCE_WEIGHT', {
				"BUDGET_RANGE": 0.5,
				"PEOPLE_SIZE": 0.3,
				"CULTURAL": 0.2
		})
		.constant('BOUND', {
				UPPER: 0.5,
				LOWER: 0.5
		});
