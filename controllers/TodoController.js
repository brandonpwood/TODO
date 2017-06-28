/*
Handles database manipulations with todo lists. Doesn't handles calls to /todo.
*/
module.exports = function(app){
  var mongoose = require('mongoose');
  var User = require('./../database/models/User.js');
  var Todo = require('./../database/models/Todo.js');

  mongoose.connect(app.get('db-port'));

  // Require user information exists.
  function requireLogin(req, res, next){
    if(!req.user){
      res.render('login.pug');
    }else{
      next();
    }
  }

  // Adding new lsits.
  app.post('/addlist', requireLogin, function(req, res){
    User.findOne({username: req.user.username}, function(err, user){
      if(err || !user){
        console.log("Failed to find" +  req.user.username);
        req.session.reset();
        res.render('login.pug');
      }else{
        user.todos.push(req.body.newList);
        user.save(function(err, newUser){
          console.log('Creating new list...')
          if(err){
            console.log('Error saving: ' + user + error);
            req.session.reset();
            res.render('login.pug');
          }else{
            req.user = newUser;
            delete req.user.password;
            req.session.User = newUser;
            console.log('Saving list...');
            newList = new Todo({
              contents: ['Add things to me!'],
              members: [user._id]
            });
            newList.save(function(err, newList){
              if(err){
                console.log('Failed to make list: ' + err);
                req.session.reset();
                res.render('login.pug');
              }else{
                console.log("List saved!");
                res.render('todos.pug', {todos: user.todos});
              }
            });
          }
        });
      }
    })
  });
}
