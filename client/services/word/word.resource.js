'use strict';

angular.module('twitterRecolector')
  .factory('Word', function ($resource) {
    return $resource('/api/words/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  });
