'use strict';

angular
		.module('mobitour', [
			'main',
			'LocalForageModule'
		])
		.run(function ($localForage) {
			//Remove later, for easy clearing of storage. $localForage.clear();
		});
