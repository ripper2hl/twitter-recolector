'use strict';

var _ = require('lodash');
var Tweet = require('./tweet.model');
var credentials = require('./credentials');
var twitter = require('ntwitter');

//Twitter api configuration
var twit = new twitter({
  consumer_key: credentials.consumer_key,
  consumer_secret: credentials.consumer_secret,
  access_token_key: credentials.access_token_key,
  access_token_secret: credentials.access_token_secret
});

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Tweet
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Tweet.find(function (err, tweets) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(tweets);
  });
};

/**
 * Get a single Tweet
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Tweet.findById(req.params.id, function (err, tweet) {
    if (err) { return handleError(res, err); }
    if (!tweet) { return res.status(404).end(); }
    return res.status(200).json(tweet);
  });
};

/**
 * Creates a new Tweet in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  var latOne = req.query.latOne || '-100.75';
  var lonOne = req.query.lonOne || '24.8';
  var latTwo = req.query.latTwo || '-99.75' ;
  var lonTwo = req.query.lonTwo || '25.8';
  var location = latOne + ',' + lonOne + ',' + latTwo + ',' + lonTwo;
  twit.stream('statuses/filter',{'locations': location },
  function(stream) {
    stream.on('data', function (data) {
      Tweet.create({
        user : data.user.name,
        status : data.text,
        img : data.user.profile_image_url,
        date : data.created_at,
        city : data.place.name,
        done : false
        }, function (err, tweet) {
          if (err) { return handleError(res, err); }
          stream.destroy();
          return res.status(201).json(tweet);
          });
      });
  });
};

/**
 * Updates an existing Tweet in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Tweet.findById(req.params.id, function (err, tweet) {
    if (err) { return handleError(res, err); }
    if (!tweet) { return res.status(404).end(); }
    var updated = _.merge(tweet, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(tweet);
    });
  });
};

/**
 * Deletes a Tweet from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Tweet.findById(req.params.id, function (err, tweet) {
    if (err) { return handleError(res, err); }
    if (!tweet) { return res.status(404).end(); }
    tweet.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
