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
//   hubot take one down     - Hubot take a beer off the wall and sings!


module.exports = function(robot) {

  robot.respond(/take down \d+/i, takeDownBeers);
  robot.respond(/go to the store/i, goToTheStore);
  robot.respond(/.*how many beer.*/i, printBeerCount);

  var numBottles = 0;

  /**
   *
   * takeDownBeers decreases the number of bottles of beer by the amount requested
   * and responds with the expected lyrics.
   *
   * If there are no more bottles, hubot will tell you.
   *
   * @param  {Hubot.Message Object} msg The message hubot saw
   *
   * ## Getting data from the message.
   *
   * example messages:
   *
   * 		hubot take down 42 beers.
   * 		hubot take down 1 beers.
   * 		hubot take down 3472374 beers.
   *
   * To be able to pull the number out of the chat message string, we need to
   * use what's called a regular expression (regex). The pseudocode for my regex
   * goes like this:
   *
   * 		1. match the characters "take down "  in that order (note the space at the end)
   * 		2. followed by any numeric character one or more times.
   *
   * Immplementation
   *
   * 		1. /take down /i
   *
   *   		- matches the character "take down" in that order
   *   		- the i at the end means to match case iNsEnsItIve
   *   		- note the extra space at the end of take down, because I want there
   *        to be a space between take down and the number of beers
   *
   *   	3. /take down (\d+)/i
   *
   * 			\d = any numeric character between 0-9.
   * 			+  = match that character 1 or more times.
   * 			() = the whole thing is wrapped in parens which tells the regex that
   * 			     it should treat this as a capture group, and to save this match
   * 					 for us to use later
   *
   * The final regex: /take down (\d+)/i
   *
   * Here is this on regex101.com, with explanations on what is matched and
   * what each matcher in the regex does - https://regex101.com/r/oL2xF8/1
   *
   * Now that I've matched the message properly using a regex, Hubot will run
   * the function I've provided for that regex, in this case takeDownBeers.
   *
   * But, How do I get the actual number that was matched in the regex? By using:
   *
   *		msg.match[]
   *
   * Hubot passes in a `msg` object to your function. On that `msg` object is
   * a property called `match` which contains all the matches from the regex
   * provided to you as an array.
   *
   * The first item in the array is the entire string that matched. Anything else
   * are capture groups. Remember we wrapped \d+ in parens? This is how we access
   * any capture groups we defined in our regex
   *
   * 	match[0] = "hubot take down 42 beers."    // the entire string match
   * 	match[1] = "42"                           // the \d+ capture group
   *
   * Note that match[1] is a string at this point, and I want to be able to use
   * it as a number, so I can subtract it from the number of beers on the wall.
   * To turn a string into a number, I can use JavaScript's parseInt method.
   *
   * 	parseInt(msg.match[1], 10) == 42  // get the first capture group
   *
   * Note the second parameter to parseInt is the number 10. This is the radix.
   * For our purposes we're always going to want to use 10. You can read more
   * about the radix on the MDN for parseInt.
   *
   * http://brians-mac.local:60351/Dash/uhsmcgth/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt.html
   *
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
