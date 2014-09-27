var mongoose = require('mongoose');

var Tuit =  mongoose.model('Tuit',{
  user : { type: String, required: true },
  status : { type: String, required: true },
  img : { type: String, required: true },
  date : { type: Date, required: true },
  city : { type: String, required: true }
});

module.exports = Tuit;
