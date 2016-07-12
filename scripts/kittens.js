// Description:
//   Bitcoin Price Retriever
//
// Commands:
//   kittens - Returns a random image of a kitten!


module.exports = function(robot) {
  robot.hear(/kitten/i, function(msg) {
    msg.http('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=kitten')
       .get()(parseGiphyJSON);

    function parseGiphyJSON(err, res, body) {
      var parsedJSON = JSON.parse(body);
      msg.send(parsedJSON.data.image_url)
    }
  });
};
