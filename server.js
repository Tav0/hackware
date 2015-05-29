// grab the packages we need
var stripe = require("stripe")("sk_test_kGOh10LZ0WOuswOg6tZIAISK"),
    express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 4567,
    publicDir = process.argv[2] || __dirname + '/';

app.use(methodOverride());
/// routes will go here
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(publicDir));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

//gets index file
app.get('/', function(req, res) {
  res.redirect("/");
});

// POST http://localhost:port
// parameters sent with

app.post('/checkout', function(req, res) {
  var email = req.body.email,
      rentedInfo = req.body.name + " purchased: " + req.body.itemName +
        " for $" + req.body.itemPrice,
      stripeToken = req.body.stripeToken,
      price = parseInt(req.body.itemPrice) * 100;
  //creates customer
  stripe.customers.create({
    source: stripeToken,
    email: email,
    description: rentedInfo
  }).then(function(customer) {
    return stripe.charges.create({
      amount: price, // amount in cents, again
      currency: "usd",
      customer: customer.id
    });
  }).then(function(charge) {
    saveStripeCustomerId(user, charge.customer);
  });
    console.log(rentedInfo);
    res.send(rentedInfo);
});

// start the server
console.log("Simple static server showing \n %s listening at http://%s:%s", publicDir, hostname, port);
app.listen(port, hostname);
