var sentiment = require('sentiment');
var trainer = require('./training.js');

module.exports = function(text) {

    trainer.training(text , function (trainedWords){
      data = sentiment(text, trainedWords );
    });
  return data;
}
