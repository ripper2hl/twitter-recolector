'use strict';

var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var twitter = require('ntwitter');
var User = require('./tuit.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

//Twitter configuration
var twit = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

tuit.count({},function(err,count){
  if(!err){
    if(count < 1000){
      twit.stream('statuses/filter', {'locations':'-100.75,24.8,-99.75,25.8'}, function(stream) {
        stream.on('data', function (data) {
          tuit.create({
            user : data.user.name,
            status : data.text,
            img : data.user.profile_image_url,
            date : data.created_at,
            city : data.place.name,
            done : false
          }, function(err,t){
            if(!err){
              count ++;
              console.log(count);
              if(count >= 10){
                stream.destroy();
              }
            }else{
              console.log(err);
            }
          });
        });

        stream.on('destroy', function (res) {
          console.log(res);
          console.log('Termino la recoleccion de tuits');
        });
      });
    }
  }else{
    console.log(err);
  }
});
