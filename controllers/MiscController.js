module.exports = function(app){
  // Using the same message for each
  var error_message = "There was an error. Blame Dan.";
  var error_title = "Whoops!";

  // Handle 404s
  app.use(function(req, res){
    res.render('error.pug',
    {title: error_title, message: error_message, error: 404});
    console.log("Failed request made at " +  req.url);
  });

  // Handle 500 errors
  app.use(function(error, req, res, next){
    res.render('error.pug',
    {title: error_title, message: error_message, error: 500});
    console.log("Server Error: " + error);
  });

}
