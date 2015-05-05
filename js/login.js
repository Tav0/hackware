$(document).ready(function() {
  $("#button").click(function(event){
    Parse.$ = jQuery;
    Parse.initialize("PRZCDqiKSpzjNuIGTEHj9jXKn6f1PRfAixB2nK2r",
      "GuD81fbE4prg1RdLLmJvhLdb8CBa21imyroGrMRk");
    //prevent default submit event

    console.log("login.js");
    var username = $("#emailid").val();
    console.log(username);
    var password = $("#passid").val();

    Parse.User.logIn(username, password, {
      success: function(user) {
        window.location.href="inventory.html";
        //alert("Welcome! " + username);
        return true;
      },
        
      error: function(user, error) {
        $('.login-form .error').html("Invalid email or password. Please try again.").show();
        console.log("Error Message:", error);
        return false;
      }
    });
    event.preventDefault();
  });
});


  /**    
  //Get data from the form and put them into variables
  var data = $(this).serializeArray(),
    username = data[0].value;
    console.log(username);
    password = data[1].value;
    console.log(password);

  //Call Parse login function with those variables
  Parse.User.logIn(username, password, {
    //if they are a match
    success: function(user){
      console.log(user);
      alert('Welcome!');
      console.log('success');
    },
    //if error
    error: function(user, error){
      console.log(error);
    }
  });
});*/
    
