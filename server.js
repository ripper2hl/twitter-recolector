//Nodejs modules
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var request = require('request');
var twitter = require('ntwitter');
var tuit = require('./model/tuit');

//Mongo Configuration
var userMongo = process.env.OPENSHIFT_MONGODB_DB_USERNAME || '';
var passMongo = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || '';
var hostMongo = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
var portMongo = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017  ;
var dataBase =  process.env.OPENSHIFT_APP_NAME || 'tuits';
var urlMongo = 'mongodb://' + userMongo + ':' + passMongo + '@' + hostMongo + ':' + portMongo + '/' + dataBase;

mongoose.connect(urlMongo,function(err){
  if(!err){
    console.log('Conexion a mongodb con exito');
  }else{
    console.log('Error al crear la conexion con la base de datos: ' + urlMongo);
    throw err;
  }
});

var port = process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || 3000;
var ipaddr = process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP;

//Twitter configuration
var twit = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

//Busca y almacena tuits por geolocalizacion en tiempo real
tuit.count({},function(err,count){
  if(!err){
    if(count < 10){
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

var app = express();
// Configuración
app.configure(function() {
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});


//Obtiene todos los tuits de la base de datos
app.get('/api/tuits', function(req, res){
  tuit.find({},function(err,data){
    res.send(data);
  });
});

//Obtiene tuits por id
app.get('/api/tuits/:id', function(req, res){
  tuit.findOne({_id : req.params.id},function(err,t){
    if(!err){
      console.log(t);
      res.send(t);
    }
    console.log(err);
  });
});

app.get('*', function(req, res) {
  res.sendFile('./public/index.html');
});

http.createServer(app).listen(port,ipaddr, function(){
  console.log('Express server listening on port ' + port);
});
