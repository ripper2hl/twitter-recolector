'use strict';

var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var twitter = require('ntwitter');
var Tuit = require('./tuit.model');
var credentials = require('./credentials');

function handleError (res, err) {
  return res.status(500).send(err);
}

//Twitter configuration
var twit = new twitter({
  consumer_key: credentials.consumer_key,
  consumer_secret: credentials.consumer_secret,
  access_token_key: credentials.access_token_key,
  access_token_secret: credentials.access_token_secret
});

/**
* Create new tuit on DB.
*
* @param req
* @param res
*/
exports.createTuit = function (req, res) {
  var latOne = req.query.latOne || '-100.75';
  var lonOne = req.query.lonOne || '24.8';
  var latTwo = req.query.latTwo || '-99.75' ;
  var lonTwo = req.query.lonTwo || '25.8';
  var location = latOne + ',' + lonOne + ',' + latTwo + ',' + lonTwo;
  twit.stream('statuses/filter',{'locations': location },
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
          res.status(200).json(t);
          });
      });
  });
};

exports.getAll = function (req, res) {
  Tuit.find( function ( error , tuits ) {
    res.status(200).json(tuits);
  });
};

exports.getTuitById = function (req, res) {
  Tuit.findOne({ _id : req.params.id } , function ( error , tuits ) {
    res.status(200).json(tuits);
  });
};
