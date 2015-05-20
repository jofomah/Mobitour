'use strict';

angular
    .module('main')
    .controller('LocationPrefCtrl', function () {
      this.locTypes = [
        {name: 'Bar', code: 'bar'},
        {name: 'Hotel', code: 'hotel'},
        {name: 'Super market', code: 'super-market'},
        {name: 'Scenic sight', code: 'scenic-sight'}
      ];
    });
