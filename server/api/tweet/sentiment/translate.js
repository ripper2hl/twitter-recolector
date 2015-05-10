var request = require('request');

exports.translate = function(req, res) {
   try {
      var langpair = req.query.langpair;
      var q = req.query.q;

      if(!langpair || !q) {
         res.send("Error: Missing fields");
      }
      else {
         request({
            url: 'https://translated-mymemory---translation-memory.p.mashape.com/api/get?langpair=' + langpair + '&q=' + q + '&mt=1&of=json&v=1',
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            }
         }, function (err, resp, bod) {
               if (err) {
                  console.log("Error when contacting url");
                  res.send("Error: when contacting url");
               } else {
                  var resultObj = JSON.parse(bod);
                  res.send(resultObj.responseData.translatedText);
                  return false;
               }
         });
       }
   } catch (error) {
      res.send("Error: " + error);
   }
}
