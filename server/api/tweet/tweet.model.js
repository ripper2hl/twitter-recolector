'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TweetSchema = new Schema({
  user : { type: String, required: true },
  status : { type: String, required: true },
  img : { type: String, required: true },
  date : { type: Date, required: true },
  city : { type: String, required: true },
  score : { type : Number, required : true },
  token : [ { type : String, required : true } ],
  wordPositive : [ { type : String } ],
  wordNegative : [ { type : String } ]
});

module.exports = mongoose.model('Tweet', TweetSchema);
