// Description:
//   Bitcoin Price Retriever
//
// Commands:
//   kitten - Returns a random image of a kitten!


module.exports = function(robot) {
  var GIPHY_URL = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=';
  robot.hear(/kitten/i, function(msg) {

    // This is some weird syntax. Note when you want to use get(). You need to
    // use an extra pair of parens. ex: .get()(function() { ... })

    msg.http(GIPHY_URL + 'kitten').get()(function parseGiphyJSON(err, res, body) {
      var parsedJSON = JSON.parse(body);
      msg.send(parsedJSON.data.image_url)
    });
  });
};
