// grab the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;

// routes will go here
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// POST http://localhost:8080/api/users
// parameters sent with 
app.post('/hackware', function(req, res) {
  var cardN = req.body.
  var token = req.body.token;
  var geo = req.body.geo;

  res.send(user_id + ' ' + token + ' ' + geo);
});


// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);