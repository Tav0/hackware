      Stripe.setPublishableKey('pk_test_Z5GLMwFTwd9TUvq6Pp1ds4dg');

      function stripeResponseHandler(status, response) {
        if (response.error) {
          //re-enable the submit button
          $('.submit-button').removeAttr( "disabled");
          //show errors on the form
          $(".payment-errors").html(response.error.message);
        } else {
          var $form = $('#payment-form');
          // response contains id and card, which contains
          //additional card details
          var token = response.id;
          // Insert the token into the form so it gets submitted
          // to the server
          $form.append($('<input type="hidden" name="stripeToken" />').val(token));
          // and submit
          $form.get(0).submit();
        }
      } 
      //$(document).ready(function() {
        $("#payment-form").submit(function(event) {
          console.log("hi");
          // disable the submit button to prevent repeated clicks
          $('.submit-button').attr('disabled', 'disabled');
          // amount you want to charge, in cents. 1000 = $10.00, 2000 = $20.00 
          // createToken returns immediately - the supplied callback submits 
          // the form if there are no errors
          var chargeAmount = itemPrice;
          Stripe.card.createToken({
            name: $("input[name='name']").val(),
            number: $('.card-number').val(),
            cvc: $('.card-cvc').val(),
            exp_month: $('.card-expiry-month').val(),
            exp_year: $('.card-expiry-year').val()
          }, chargeAmount, stripeResponseHandler);
          return false; //submit from callback;
        });
      });

      if (window.location.protocol === 'file:') {
        alert("stripe.js does not work when included in pages served" + 
                      " over file:// URLs. Try serving this page over a" + 
                      " webserver. Contact support@stripe.com if you need" + 
                      " assistance.");
      }
