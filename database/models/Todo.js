var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  contents: Array,
  members: Array
});

var todo = mongoose.model('todo', todoSchema);

module.exports =  todo;
