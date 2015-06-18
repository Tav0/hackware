Parse.initialize("PRZCDqiKSpzjNuIGTEHj9jXKn6f1PRfAixB2nK2r",
    "GuD81fbE4prg1RdLLmJvhLdb8CBa21imyroGrMRk");

//user wants to try to see confirmation page without being logged.
if(Parse.User.current() == null) { 
  window.location.href = "../login.html"; 
}

$(window).load(function() {
//if no item is found show an error 
  if($.jStorage.get("item") == null) {
    console.log("null");
    $(".confirm").append(
      "<p>You have not made a new payment.</p>" + 
      "<p>Please check your email for more information" +
      " if you have purchased a rental item.</p>" + 
      "<p> You will be now redirected to the main page.</p>");
  } else {
    //show user item bought
    var Rental = Parse.Object.extend("Rental"),
        paidItem = new Parse.Query("Rental");
    paidItem.equalTo("Item", $.jStorage.get("item")); 
    paidItem.find({
    success: function(result) {
      $(".confirm").append(
        "<p>Hi " + result[0].get("Name") + 
        ", your rental payment has been received.</p>" + 
        "<ul id='purchased'><li>" + result[0].get("Item") +
        " " + "$" + result[0].get("Price") + "</li></ul>" +  
        "<p>Please check for an email from us!</p>" +
        " <p>You will be now redirected to the main page.</p>");
    }, error: function(result, error){
      //error logic to do 
      console.log("error");
      }
    });
  }

  //move user back to main page 
  $.jStorage.flush();
  //wait 10 seconds, then redirect to home page.
  window.setTimeout(
      function(){
        // Move to a new location or you can do something else
        window.location.href = "https://hackware.io";
      }, 10000);
});
