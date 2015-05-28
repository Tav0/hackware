// grab the packages we need
var stripe = require("stripe")("sk_test_kGOh10LZ0WOuswOg6tZIAISK");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;

// routes will go here
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// POST http://localhost:8080/api/users
// parameters sent with 
app.post('/checkout', function(req, res) {
  var email = req.body.email;
  var stripeToken = req.body.stripeToken;
  
  stripe.customers.create({
    source: stripeToken,
    description: email
  }).then(function(customer) {
    return stripe.charges.create({
      amount: 1000, // amount in cents, again
      currency: "usd",
      customer: customer.id
    });
  }).then(function(charge) {
    saveStripeCustomerId(user, charge.customer);
  });
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
