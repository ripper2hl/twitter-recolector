'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
  name: String,
  score: Number
});

module.exports = mongoose.model('Word', WordSchema);
