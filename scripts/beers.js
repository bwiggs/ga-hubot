// Description:
//   Interactive 99 Bottles of Beer
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot go to the store  - Hubot goes to the store and buy up to 99 bottles of beer
//   hubot take on down     - Hubot take a beer off the wall and sings!


module.exports = function(robot) {

  robot.respond(/take down (\d+)/i, takeDownBeers);
  robot.respond(/go to the store/i, goToTheStore);
  robot.respond(/.*how many beer.*/i, printBeerCount);

  var numBottles = 0;

  /**
   * takeDownBeers decreases the number of bottles of beer by the amount requested
   * and responds with the expected lyrics.
   * If there are no more bottles, hubot will tell you.
   * @param  {Hubot.Message Object} msg The message hubot saw
   */
  function takeDownBeers(msg) {
    var message,
        takeDownCount = parseInt(msg.match[1], 10); // converts the string '10' to the number 10. This number is what was said to hubot in the slack channel

    if(!numBottles) {
      message = "We're outta beer! Noooooo!";
    } else if(takeDownCount > numBottles) {
      message = "We don't have that many beers!";
    } else {
      message = bottleCountString(numBottles) + " of beer on the wall, " +
                bottleCountString(numBottles) + " bottles of beer! " +
                "take " + takeDownCount + " down, pass " +
                (takeDownCount === 1 ? 'it' : 'them') + " around, " +
                bottleCountString(numBottles - takeDownCount) + ' of beer on the wall!';
      numBottles -= takeDownCount;
    }

    msg.send(message);
  }

  /**
   * printBeerCount prints out the number off beers on the wall.

   * @param  {Hubot.Message Object} msg The message hubot saw
   */
  function printBeerCount(msg) {
    msg.send('I have ' + bottleCountString(numBottles) + ' of beer on the wall');
  }

  /**
   * goToTheStore sets the number of beers to 99.
   * @param  {Hubot.Message Object} msg The message hubot saw
   */
  function goToTheStore(msg) {
    numBottles = 99;
    msg.send("Go to the store, buy you some more, 99 bottles of beer on the wall!");
  }

  /**
   * returns the proper pluralized or singular string based on the number of bottles
   * example:
   * 	1 - "1 bottle"
   * 	0 or > 1 "3 bottles"
   *
   * @param  {Number} num The number of beers
   * @return {String}     The string to render
   */
  function bottleCountString(num) {
    var str = num + ' bottle';
    if(num !== 1) {
      str += 's'
    }
    return str;
  }
};
