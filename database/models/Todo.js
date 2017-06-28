var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  todo: Array,
  members: Array
});
