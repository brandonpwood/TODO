/*
Handles login and logout calls, as well as everything on the login page.
*/
module.exports = function(app){
  var User = require('./../database/models/User.js');
  var mongoose = require('mongoose');
  mongoose.connect(app.get('db-port'));

  // Require user information exists.
  function requireLogin(req, res, next){
    if(!req.user){
      res.render('login.pug');
    }else{
      next();
    }
  }
  // Redirect common index page names to /login.
  commonURLS = ['/home', '/', '/index'];
  for(i in commonURLS){
    app.get(commonURLS[i], function(req, res){
      res.render('login.pug');
    });
  }

  // Handle Login page callls.
  app.get('/login', requireLogin, function(req, res){
    // Handle calls to users todo lists
    res.render('todos.pug', {todos: req.user.todos});
  });

  // Handle initial logins. Different from checking sessions.
  app.post('/login', function(req, res){
    if(req.body.username && req.body.password){
      User.findOne({username: req.body.username}, function(err, user){
        if(!user){
          res.render('login.pug', {message: 'Incorrect username or password'});
        }else if(req.body.password === user.password){
          req.session.user = user;
          res.render('todos.pug', {todos: user.todos});
        }
      });
    }
  });

  // Handle account creation.
  app.post('/create', function(req, res){
    User.findOne({username: req.body.name}, function(err, user){
      if(err != null){
        console.log(error);
        return
      }else if (user){
        res.render('login.pug', {message: "Someone is already using that username"});
      }else{
        new_user = new User({
          username: req.body.username,
          password: req.body.password,
          todos: []
        });
        new_user.save();
        res.render('login.pug', {message: "Succesfully Created an account"});
      }
    })
  });

  // Logout.
  app.get('/logout', function(req, res){
    req.session.reset();
    res.render('login.pug');
  });

}
