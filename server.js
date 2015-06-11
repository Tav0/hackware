// grab the packages we need
//sk_live_nDhWREOk6VbBFDsEg6UPLCYw is the live key
//sk_test_kGOh10LZ0WOuswOg6tZIAISK is the test key

//current status: LIVE
var Parse = require('parse').Parse;
Parse.initialize("PRZCDqiKSpzjNuIGTEHj9jXKn6f1PRfAixB2nK2r", 
    "GuD81fbE4prg1RdLLmJvhLdb8CBa21imyroGrMRk");

var stripe = require("stripe")("sk_live_nDhWREOk6VbBFDsEg6UPLCYw"),
    express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 4567,
    publicDir = process.argv[2] || __dirname + '/';

console.log(process.argv[0]);
console.log(process.argv[1]);
console.log(process.argv[2]);

//gets index file
app.get('/', function(req, res) {
  res.redirect("/index.html");
});

app.use(methodOverride());
// routes will go here
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(publicDir));
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

// POST http://localhost:port
// parameters sent with

app.post('/purchase', function(req, res) {
 var email = req.body.email,
  rentedInfo = req.body.name + " purchased: " + req.body.itemName +
    " for $" + req.body.itemPrice,
  stripeToken = req.body.stripeToken,
  price = parseInt(req.body.itemPrice) * 100;
  console.log(stripeToken);
  //creates customer
  //check if user already exists
  var currentUser = req.body.currentUser;//get the current user ID
  console.log(req.body.currentUser);
  //TODO query to see if user exists. if it does, pull it up, else create new customer and save it.
  var customerID = null;
  var user = null;
  var query = new Parse.Query("_User");
  query.equalTo("username", email);
  query.find({
    success: function(results) {
      user = results[0];
      customerID = results[0].get("customerID");
    }, error: function(user, error){
        //Error logic. TO DO
    }
  });
   
  if(customerID == null){
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
      user.set("customerID", charge.customer);
      user.save(null, {
        success: function(user) {
          // Execute any logic that should take place after the object is saved.
        },
        error: function(user, error) {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
        }
      });
    });
  } else {
    //TODO user the customerID to create a new charge.
    //at this point we have the customerID
    stripe.charges.create({
      amount: price,
      currency: "usd",
      source: stripeToken, // obtained with Stripe.js
      description: rentedInfo
    }, function(err, charge) {
      // asynchronously called
    });
  }	

  //------------------------------------------------------------
  //Parse stuff
  //------------------------------------------------------------
  var itemID = null;
  //get the first item that matches the description:
  var query = new Parse.Query("Hardware");
  query.equalTo("Name", req.body.itemName);//needs to match the name
  query.equalTo("rented", false);//needs to be unrented
  query.find({
    success: function(results) {
      itemID=results[0];
      results[0].set("rented", true); //set the item as rented and continue.
      results[0].save(null, {
        success: function(rental) {
        //don't need to do anything else once it's saved...
        }, error: function(rental, error) {
          //alert("unable to save object");//TODO something here, don't
          //know what
        }
      });
    }, error: function(results, error) {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
    }
  });
  var query = new Parse.Query("HW");
    query.equalTo("Name", req.body.itemName);//needs to match the name
    query.find({
    success: function(results) {
      //decrement the number of available items
      var newamount = results[0].get("Available") - 1;
      results[0].set("Available", newamount);
      results[0].save(null, {
        success: function(results) {
          // Execute any logic that should take place after the object is saved.
        },
        error: function(results, error) {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
        }
      });
    }, error: function(error) {
      //nothing to do here.... it should always return the item
    }
  });
  
  if(itemID != null){
    // create parse rental item 
    var Rental = Parse.Object.extend("Rental");
    var rental = new Rental();

    rental.set("User",currentUser);//TODO check that this works...
    rental.set("Name", req.body.name);
    rental.set("Item", itemID);
    rental.set("Price", req.body.itemPrice);
    rental.set("Email", email);
    rental.set("Address_Line_1", req.body.addressLine1);
    rental.set("Address_Line_2", req.body.addressLine2);
    rental.set("CityState", req.body.citystate);
    rental.set("Zip_Code", req.body.zipcode);
    rental.set("Returned", false);

    rental.save(null, {
      success: function(rental) {
        //don't need to do anything else once it's saved...
      }, error: function(rental, error) {
          //ERROR LOGIC TO DO
      }
    });
 } 
  console.log(rentedInfo);
  res.send(rentedInfo);
});

// start the server
console.log("Simple static server showing \n %s listening at http://%s:%s",
    publicDir, hostname, port);
app.listen(port, hostname);
