'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TuitSchema = new Schema({
  user : { type: String, required: true },
  status : { type: String, required: true },
  img : { type: String, required: true },
  date : { type: Date, required: true },
  city : { type: String, required: true }
});

module.exports = mongoose.model('Tuit', TuitSchema);
