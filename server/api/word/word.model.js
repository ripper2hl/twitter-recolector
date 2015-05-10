'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
  name: {type: String, index: {unique: true, dropDups: true} },
  score: Number
});

module.exports = mongoose.model('Word', WordSchema);
