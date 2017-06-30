module.exports = function(app){
  var mongoose = require('mongoose');
  var Todo = require('./../database/models/Todo.js');

  mongoose.connect(app.get('db-port'));


  Todo.find({}, function(err, todos){
    if(!err){
      
    }else throw err;

  });
}
