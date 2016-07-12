// Description:
//   Bitcoin Price Retriever
//
// Commands:
//   hubot bitcoin - Spits out the latest bitcoin price from coindesk.com

module.exports = function(robot) {

  var COINBASE_API = 'https://api.coindesk.com/v1/bpi/currentprice.json';

  robot.respond(/bitcoin/i, function(msg) {
    msg.http(COINBASE_API).get()(function(err, resp, json) {
      var data = JSON.parse(json);
      console.log('Bitcoins are currently worth $' + data.bpi.USD.rate_float + ' - http://www.coindesk.com/price/');
    });
  });
};
