// Description:
//   hi responder!
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   im running late  - Well good for you
//   hubot ill be there on time  - Well good for you


module.exports = function(robot) {
  robot.hear(/im running late/i, function(msg){
      msg.send("hurry up!");
  });

  robot.respond(/ill be there on time/i, function(msg){
      msg.send("Well good for you!");
  });
};
