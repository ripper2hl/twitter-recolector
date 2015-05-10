var Word = require('mongoose').model("Word");
var sentiment = require('sentiment');
var MsTranslator = require('mstranslator');

var client = new MsTranslator({
      client_id: "twitterRecolector"
      , client_secret: "5quDhsFxW+Op0wAIzmeiVgn+034aifeRfTtcyKFxEMg="
}, true);
//
// module.exports = function () {
//
//   return {
//     directives: 4,
//     angular: 5,
//     code: 3,
//     scope: 3,
//     buen: 3,
//     por : 4
//   };
// };

exports.training = function (text, callback){

  client.translate({from:'es',to:'en', text : text }, function(err, textEnglish){
    if(err){return err;}
    var dataEnglish = sentiment(textEnglish);

    for(var i = 0; i < dataEnglish.words.length; i++){
      var wordData = sentiment(dataEnglish.words[i]);
      var client2 = new MsTranslator({
            client_id: ""
            , client_secret: ""
      }, true);
      client2.translate({from:'en',to:'es', text : dataEnglish.words[i] }, function (wordSpanish) {

        Word.create({name : wordSpanish , score : wordData.score },
          function (err, word){
            if(err){return err;}
            console.log("palabra creada :" + word);
        });
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

  });
};
