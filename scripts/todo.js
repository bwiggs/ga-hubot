// Description:
//   To Do list manager
//
// Commands:
//   hubot add todo My Task - Adds "My Task" to your todo list
//   hubot delete todo My Task - Deletes "My Task" to your todo list
//   hubot todo list - Shows you your todo list.

module.exports = function(robot) {

  // We'll use an array to store our todos.
  var todos = [];

  robot.respond(/add todo (.*)/i, add);
  robot.respond(/todo list/i, list);
  robot.respond(/delete todo (.*)/i, deleteTodo);

  function add(msg) {
    todos.push(msg.match[1]);     // add the item to the todo array.
    msg.reply('Added ' + msg.match[1]);
  }

  function list(msg) {
    if(todos.length) {
      msg.reply('Your To Dos \n' + todos.sort().join('\n'));
    } else {
      msg.reply('Your to do list is empty');
    }
  }

  function deleteTodo(msg) {
    var todo = msg.match[1];       // get the todo string
    var idx = todos.indexOf(todo); // get the index of the element that matches

    if(idx > -1) {
      todos.splice(idx, 1);        // delete the element with the given index
      msg.reply('Deleted ' + todo);
    } else {
      msg.reply('Could not find ' + todo);
    }
  }
};
