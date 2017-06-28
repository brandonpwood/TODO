/*
Handles login and logout calls, as well as everything on the login page.
*/
module.exports = function(app){
  var User = require('./../database/models/User.js');
  var mongoose = require('mongoose');


  //Handle logins.
  app.post('/login', function(req, res){
    if(req.body.name && req.body.password){
      mongoose.connect(app.get('db-port'));

      User.findOne({username: req.body.name}, function(err, user){
        if(!user){
          res.render('login.pug', {message: 'Incorrect username or password'});
        }else if(req.body.password === user.password){
          req.session.user = user;
          res.render('todo.pug', {todo: user.todo})
        }
      });
    }
  });

  // Handle account creation.
  app.post('/create', function(req, res){
    mongoose.connect(app.get('db-port'));

    User.findOne({username: req.body.un}, function(err, user){
      if(err != null){
        console.log(error);
        return
      }else if (user){
        res.render('login.pug', {message: "Someone is already using that username"});
      }else{
        new_user = new User({
          username: req.body.un,
          password: req.body.pw,
          todo: []
        });
        new_user.save();
        res.render('login.pug', {message: "Succesfully Created an account"});
      }
    })
  });
}
