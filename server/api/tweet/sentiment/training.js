var Word = require('mongoose').model("Word");
var sentiment = require('sentiment');

exports.training = function (text, callback){
  var dataEnglish = sentiment(text);
  for(var i = 0; i < dataEnglish.words.length; i++){
    var wordData = sentiment(dataEnglish.words[i]);
    Word.create({name : dataEnglish.words[i] , score : wordData.score },
      function (err, word){
        if(err){return err;}
      });
    }

    Word.find({}, function (err, words){
      if(err){return err;}
      var trainedWords = {};
      words.forEach(function (w){
        trainedWords[w.name] = w.score;
      });
      callback(trainedWords);
    });

    callback();
  };
