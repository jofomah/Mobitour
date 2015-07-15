'use strict';

angular
    .module('db')
    .constant('DBConfig', {
      DB_NAME: 'mobitour',
      DB_URL: 'http://admin:admin@localhost:5984/mobitour'
    });
