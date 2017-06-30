var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  contents: Array,
  owner: String
});

var todo = mongoose.model('todo', todoSchema);

module.exports =  todo;
