// Description:
//   linkme link saver
//
// Commands:
//   hubot linkme add name http://url - Saves a link for the given name
//   hubot linkme name - Returns the link for the given name
//   hubot linkme list - Shows all your saved links

module.exports = function(robot) {
  var links = {
    'class github': 'https://github.com/ga-students/JS-ATX-1',
    'slackbot instructions': 'https://github.com/ga-students/JS-ATX-1/blob/master/projects/unit1/project-01.md'
  };

  robot.respond(/linkme add (.*) (http.*)/i, function(msg) {
    var key = msg.match[1];
    var url = msg.match[2];
    links[key] = url;
    msg.send('saved ' + key + ' (' + url + ')');
  })

  robot.respond(/linkme (.*)/i, function(msg) {
    var key = msg.match[1];
    msg.send(links[key]);
  })

  robot.respond(/linkme list/i, function(msg) {
    var list = [];
    for(key in links) {
      list.push(key + ': ' + links[key]);
    }
    msg.send(list.join('\n'));
  })
};
