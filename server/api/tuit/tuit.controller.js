'use strict';

var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var twitter = require('ntwitter');
var Tuit = require('./tuit.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

//Twitter configuration
var twit = new twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

/**
* Create new tuit on DB.
*
* @param req
* @param res
*/
exports.getTuit = function (req, res) {
  twit.stream('statuses/filter',
  {'locations':'-100.75,24.8,-99.75,25.8'},
  function(stream) {
    stream.on('data', function (data) {
      Tuit.create({
        user : data.user.name,
        status : data.text,
        img : data.user.profile_image_url,
        date : data.created_at,
        city : data.place.name,
        done : false
        }, function(err,t){
          stream.destroy();
          console.log(err);
          });
      });
  });
};
