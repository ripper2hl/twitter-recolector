var sentiment = require('sentiment');
var trainer = require('./training.js');

module.exports = function(text) {

  var data =  sentiment(text);
  if(data.score == 0 && data.negative.length == 0 && data.positive.length == 0 ){
    trainer.training(text , function (trainedWords){
      data = sentiment(text, trainedWords );
    });
  }
  return data;
}
