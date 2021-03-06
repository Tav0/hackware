// grab the packages we need
//sk_live_nDhWREOk6VbBFDsEg6UPLCYw is the live key
//sk_test_kGOh10LZ0WOuswOg6tZIAISK is the test key

//current status: LIVE!
var Parse = require('parse').Parse;
Parse.initialize("PRZCDqiKSpzjNuIGTEHj9jXKn6f1PRfAixB2nK2r",
	"GuD81fbE4prg1RdLLmJvhLdb8CBa21imyroGrMRk");

var stripe = require("stripe")("sk_test_kGOh10LZ0WOuswOg6tZIAISK"),
	express = require("express"),
	app = express(),
	bodyParser = require('body-parser'),
	errorHandler = require('errorhandler'),
	methodOverride = require('method-override'),
	hostname = process.env.HOSTNAME || 'localhost',
	port = parseInt(process.env.PORT, 10) || 4567,
	publicDir = process.argv[2] || __dirname + '/';

//gets index file
app.get('/', function(req, res) {
	res.redirect("/index.html");
});

app.use(methodOverride());
// routes will go here
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
	extended: true
})); // support encoded bodies
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

	//creates customer
	//check if user already exists
	var sessionToken = req.body.sessionToken; //get the current user object
	var execute = true; //boolean to check if payment went through

	Parse.User.become(sessionToken).then(function(user) {
		var customerID = user.get('customerID');
		console.log("customer ID: " + customerID);
		if (customerID === null) {
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
						execute = false;
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
				execute = false;
			});
		}
	});

	//finished the stripe stuff, now updating parse DB
	if (execute) {
		//get the first item that matches the description:
		var query = new Parse.Query("Hardware");
		query.equalTo("Name", req.body.itemName); //needs to match the name
		query.equalTo("rented", false); //needs to be unrented
		query.find({
			success: function(results) {
				var itemID = results[0].get('itemID');
				console.log("item id: " + itemID);
				results[0].set("rented", true); //set the item as rented and continue.
				results[0].save(null, {
					success: function(rentedItem) {
						//update the hackware quota
						var query = new Parse.Query("HW");
						query.equalTo("Name", req.body.itemName); //needs to match the name
						query.find({
							success: function(results) {
								//decrement the number of available items
								var newamount = results[0].get("Available") - 1;
								results[0].set("Available", newamount);
								results[0].save(null, {
									success: function(results) {
										// done 
										var Rent = Parse.Object.extend("Rental");
										var rental = new Rent();
										rental.set("Name", (req.body.name).toString());
										rental.set("Item", (req.body.itemName).toString());
										rental.set("Price", Number(req.body.itemPrice));
										rental.set("Email", (req.body.email).toString());
										rental.set("Address_Line_1", (req.body.addressLine1).toString());
										rental.set("Address_Line_2", (req.body.addressLine2).toString());
										rental.set("CityState", (req.body.citystate).toString());
										rental.set("Zip_Code", (req.body.zipcode).toString());
										rental.set("Returned", false);

										rental.save(null, {
											success: function(rental) {
												console.log('item info stored');
												//don't need to do anything else once it's saved...    
											},
											error: function(rental, error) {
												//ERROR LOGIC TO DO    
												console.log("something went wrong..." + error);
											}
										});
									},
									error: function(error) {
										//nothing to do here.... it should always return the item
									}
								});
							},
							error: function(results, error) {
								//error logic to do
							}
						});
					},
					error: function(rentedItem, error) {
						//error to do
					}
				});
			},
			error: function(results, error) {
				//error query error
			}
		});
		console.log(rentedInfo);
		res.redirect("/purchase/confirmation.html");

	} else {
		console.log("payment failed somehow...");
	}

});
// start the server
console.log("Simple static server showing \n %s listening at http://%s:%s",
	publicDir, hostname, port);
app.listen(port, hostname);
