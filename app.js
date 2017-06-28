/*
TODO: Sessions, database lists, animations and front end, socket.io chats ---> refactor
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


// Set ports
app.set('port', 8000 || env.PORT);
app.set('db-port', 'mongodb://127.0.0.1/todo');

// Sessions
app.use(session({
  cookieName: 'session',
  secret: 'N0TT H3 R344134314141241LLL Str1asdfng',
  duration: 1000 * 60 * 5,
  activeDuration: 1000 * 60 * 5
}));
//Filter requests that don't have sessions, send those that do home.
app.use(function(req, res, next){
  if(!req.user){
    res.render('login.pug');
  }else{
    res.render('todo.pug');
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
var MiscController =  require('./controllers/MiscController.js');

// Fire Controllers
LoginController(app);
MiscController(app);


// Listen
app.listen(app.get('port'), function(){
  console.log("listening on port " + app.get('port'));
});
