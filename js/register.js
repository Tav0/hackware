$(document).ready(function(){
  $("form").submit(function(){
    Parse.initialize("PRZCDqiKSpzjNuIGTEHj9jXKn6f1PRfAixB2nK2r",
        "GuD81fbE4prg1RdLLmJvhLdb8CBa21imyroGrMRk");

    var User = Parse.Object.extend("_User");
    var newUser = new User();

    newUser.set("username", $("#inputEmail").val());
    newUser.set("password", $("#inputPassword").val());
    newUser.set("email", $("#inputEmail").val());
    newUser.set("first", $("#inputFirstName").val());
    newUser.set("last", $("#inputLastName").val());
    newUser.set("institution", $("#inputSchool").val());
    //interested hardware
    newUser.set("hardware", $("#inputHardware").val());
    newUser.set("boxApt", $("#inputAptBox").val());
    newUser.set("address", $("#inputAddress").val()); 
    newUser.set("city", $("#inputCity").val());
    newUser.set("state", $("#inputState").val());  
    newUser.set("zipcode", $("#inputZipCode").val());
    //gender
    newUser.set("gender", $("input:radio[name=sex]:checked").val());
    newUser.set("age", $("#inputAge").val());
    newUser.set("educationlvl", $("#inputEduLvl").val());
    //check for terms

    newUser.signUp(null, { 
      success: function(newUser){
        var userACL = new Parse.ACL(newUser);
        newUser.setACL(userACL);
        newUser.save();
        window.location.href="inventory.html"; 
      },
      error: function(newUser,  err){ //add if email is already used
        $('.form-signin .error').html(
            "<span style='color:#E44C65'>Email already used." + 
            " Please try again.</span>").show();
          //console.log("error: " + err.code + " " + err.message);
      }
    });
    event.preventDefault();
  });
})

