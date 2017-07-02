false/*
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

  /*Quiet requests take a call to do something to a database from AJAX,
    and respond with the status of the save..*/

  // Adding new lsits without rendering. USed for quit AJAX calls.
  app.post('/addlistquiet', requireLogin, function(req, res){
    if(req.body){
      User.findOne({username: req.user.username}, function(err, user){
        check = true;
        user.todos.forEach(function(todo){
          if(todo.name === req.body.name){
            check = false;
          }
        });

        if(!user || err || !check){
          if(!check){
            res.send("List already exists");
          }else{
            res.send("Server error. Please Try again later.");
          }
        }else{
          user.todos.push(req.body);
          user.save(function(err, newUser){
            if(!err){
              res.send(true);
            }else throw err;
          });
        }
      });
    }else{
      res.send('No body recieved');
    }
  });


  app.post('/deletelistquiet', requireLogin, function(req, res){
    User.findOne({username: req.user.username}, function(err, user){
      if(!user || err || !req.body){
        res.send("Server error");
      }else{
        user.todos.splice(user.todos.indexOf(req.body.name, 1));
        user.save(function(err, newUser){
          if(!newUser || err){
            res.send("Server error");
          }else{
            res.send(true);
          }
        })
      }
    })
  });
}
