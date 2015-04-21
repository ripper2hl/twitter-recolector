'use strict';

var Tweet = require('./tweet.model');

exports.register = function (socket) {

  Tweet.schema.post('save', function (doc) {
    socket.emit('Tweet:save', doc);
  });

  Tweet.schema.post('remove', function (doc) {
    socket.emit('Tweet:remove', doc);
  });

};
