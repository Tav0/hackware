$(document).ready(function(){
  $("#btnSubmit").click(function(){
    Parse.initialize("PRZCDqiKSpzjNuIGTEHj9jXKn6f1PRfAixB2nK2r",
        "GuD81fbE4prg1RdLLmJvhLdb8CBa21imyroGrMRk");

    var User = Parse.Object.extend("_User");
    var newUser = new User();

    newUser.set("username",
        document.getElementById('inputEmail').value);
    newUser.set("password",
        document.getElementById('inputPassword').value);
    newUser.set("email", 
        document.getElementById('inputEmail').value);
    newUser.set("first", 
        document.getElementById('inputFirstName').value);
    newUser.set("last", 
        document.getElementById('inputLastName').value);
    newUser.set("institution", 
        document.getElementById('inputSchool').value);
    //interested hardware
    newUser.set("hardware", 
        document.getElementById('inputHardware').value);
    newUser.set("boxApt", 
        document.getElementById('inputAptBox').value);
    newUser.set("address", 
        document.getElementById('inputAddress').value); 
    newUser.set("city", 
        document.getElementById('inputCity').value);
    newUser.set("state", 
        document.getElementById('inputState').value);  
    newUser.set("zipcode", 
        document.getElementById('inputZipCode').value);
    //gender
    newUser.set("gender", 
        document.getElementById('inputGender').value);
    newUser.set("age", 
        document.getElementById('inputAge').value);
    newUser.set("educationlvl", 
        document.getElementById('inputEduLvl').value);
    //check for terms

    newUser.signUp(null, { 
      success: function(newUser){
        console.log("saved");
        window.location.href="inventory.html"; 
      },
      error: function(newUser,  err){
        console.log("error: " + err.code + " " + err.message);
      }
    });
  });
})

