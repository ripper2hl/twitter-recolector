'use strict';

var _ = require('lodash');
var Tweet = require('./tweet.model');
var credentials = require('./credentials');
var twitter = require('ntwitter');
var sentiment = require('./sentiment/sentimentAnalysis');
var schedule = require('node-schedule');

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

exports.recolect = function(){
  var j = schedule.scheduleJob('20 * * * *', function(){
    console.log('Start recolection!');
    var latOne = flagLocation ? '-74' : '-100.75';
    var lonOne = flagLocation ? '40' : '24.8';
    var latTwo = flagLocation ? '-73' : '-99.75';
    var lonTwo = flagLocation ? '41' : '25.8';
    //MTY -100.75, 24.8 , -99.75 ,25.8
    //San Fransisco -122.75,36.8,-121.75,37.8
    var location = latOne + ',' + lonOne + ',' + latTwo + ',' + lonTwo;
    twit.stream('statuses/filter',{'locations': location },
    function(stream) {
      stream.on('data', function (data) {
        var sentimentData = sentiment(data.text);
        Tweet.create({
          user : data.user.name,
          status : data.text,
          img : data.user.profile_image_url,
          date : data.created_at,
          city : data.place.name || undefined,
          token : sentimentData.tokens,
          score : sentimentData.score,
          wordPositive : sentimentData.positive,
          wordNegative : sentimentData.negative,
          done : false
          }, function (err, tweet) {
            if (err) { return err; }
            removeOld();
            });
        });

        stream.on('end', function (response) {
          // Handle a disconnection
          toggleFlagLocation();
          console.log('End recolection');
        });

        stream.on('destroy', function (response) {
          // Handle a 'silent' disconnection from Twitter, no end/error event fired
          console.log('Destroy recolection');
        });
        setTimeout(stream.destroy, 480000);
    });
  });
};

var removeOld = function (){
  Tweet.findOne({}, {}, { sort: { 'date' : 1 } }, function(err, tweet) {
    tweet.remove(function (err) {
      if(err){return err;}
      return true;
    });
  });
}

var flagLocation = false;

var toggleFlagLocation = function (){
  flagLocation = !flagLocation;
}
