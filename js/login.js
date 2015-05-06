$(document).ready(function() {
  $("form").submit(function(event){
    Parse.$ = jQuery;
    Parse.initialize("PRZCDqiKSpzjNuIGTEHj9jXKn6f1PRfAixB2nK2r",
      "GuD81fbE4prg1RdLLmJvhLdb8CBa21imyroGrMRk");
    //prevent default submit event

    var username = $("#emailid").val();
    console.log(username);
    var password = $("#passid").val();

    Parse.User.logIn(username, password, {
      success: function(user) {
        window.location.href="inventory.html";
        return true;
      },
        
      error: function(user, error) {
        $('.login-form .error').html(
            "<span style='color:#E44C65'>Invalid email or password." +  
            " Please try again.</span>").show();
        console.log("Error Message:", error);
        return false;
      }
    });
    event.preventDefault();
  });
});
