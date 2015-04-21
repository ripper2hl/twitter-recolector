'use strict';

angular.module('twitterRecolector')
  .factory('Tweet', function ($resource) {
    return $resource('/api/tweets/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  });
