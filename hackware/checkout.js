// Set your secret key: remember to change this to your live secret key in
// production
// // See your keys here https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
var express = require('express');
var app = express();

app.post("checkout.html", function(req, res){


// (Assuming you're using express - expressjs.com)
// // Get the credit card details submitted by the form
var stripeToken = request.body.stripeToken;

stripe.customers.create({
    source: stripeToken,
    description: 'payinguser@example.com'
}).then(function(customer) {
    return stripe.charges.create({
          amount: 1000, // amount in cents, again
      currency: "usd",
              customer: customer.id
                  });
}).then(function(charge) {
    saveStripeCustomerId(user, charge.customer);
});

// Later...

var customerId = getStripeCustomerId(user);

stripe.charges.create({
    amount: 1500, // amount in cents, again
    currency: "usd",
      customer: customerId
});

});
