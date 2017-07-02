/*
TODO: front end js, logout/list deletes/account deletes, socket.io chats, animations and front end --> deploy(aws?)
Started 6/8/17
Brandon Wood
*/

// App
var express = require('express');
var app = express();
// Utilities
var bodyParser = require('body-parser');
var session = require('client-sessions');
// Views
var pug = require('pug');
// Databse
var mongoose = require('mongoose');
var User = require('./database/models/User.js');

// Set ports
app.set('port', 8000 || env.PORT);
app.set('db-port', 'mongodb://127.0.0.1/todo');

// Database Connection
mongoose.connect(app.get('db-port'));

// Sessions
app.use(session({
  cookieName: 'session',
  secret: 'N0TT H3 R344134314141241LLL Str1asdfng',
  duration: 1000 * 60 * 5,
  activeDuration: 1000 * 60 * 5
}));

//Filter requests that don't have sessions, send those that do home.
app.use(function(req, res, next){
  if(req.session && req.session.user){
    User.findOne({username: req.session.user.username}, function(err, user){
      if(user && !err){
        req.user = user;
        delete req.user.password;
        delete req.user.todos;
        req.session.user = user;
      }
      next();
    })
  }else{
    next();
  }
});

// Initialize view engine
app.set('views', './public/views');
app.set('view engine', 'pug');


// Serve static files
app.use(express.static('./public'));

// Connect body parser
app.use(bodyParser.urlencoded({extended: false}));

// Load Controllers
var LoginController = require('./controllers/LoginController.js');
var TodoController = require('./controllers/TodoController.js');
var MiscController =  require('./controllers/MiscController.js');

// Fire Controllers
LoginController(app);
TodoController(app);
MiscController(app);


// Listen
app.listen(app.get('port'), function(){
  console.log("listening on port " + app.get('port') + '...');
});
