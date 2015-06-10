$(document).ready(function() {     
  $.ajax({
    type:"GET",
  url:'https://jsonp.nodejitsu.com/?url=https%3A%2F%2Fapi.typeform.com%2Fv0%2Fform%2FCNOtal%3Fkey%3D26e72de2fd4681337e33d1e2b333947a7d5d31bc%26completed%3Dtrue',
  success: function(user){

    Parse.initialize("PRZCDqiKSpzjNuIGTEHj9jXKn6f1PRfAixB2nK2r",
      "GuD81fbE4prg1RdLLmJvhLdb8CBa21imyroGrMRk");

    var User = Parse.Object.extend("_User");
    var newUser = new User();
    var entryN = user.responses.length - 1 ;
    
    newUser.set("username", user.responses[entryN].answers.email_4415264);
    newUser.set("password", user.responses[entryN].answers.textfield_4607199);
    newUser.set("email", user.responses[entryN].answers.email_4415264);

    //Look for the last user in parse's DB and add below inputs in it.

    newUser.set("first", user.responses[entryN].answers.textfield_4415133);
    newUser.set("last", user.responses[entryN].answers.textfield_4415230);
    newUser.set("boxApt", user.responses[entryN].answers.textfield_5335803);
    newUser.set("address", user.responses[entryN].answers.textfield_4415504);
    newUser.set("city", user.responses[entryN].answers.textfield_4415524);
    newUser.set("state", user.responses[entryN].answers.dropdown_5335793);
    newUser.set("zipcode", user.responses[entryN].answers.textfield_5409814);
    //education
    newUser.set("institution", user.responses[entryN].answers.textfield_4415906);
    newUser.set("educationlvl", user.responses[entryN].answers.list_5240095_choice 
        + user.responses[entryN].answers.list_5240095_other);
    
    newUser.set("age", user.responses[entryN].answers.list_5366345_choice);
    newUser.set("gender", user.responses[entryN].answers.list_4415812_choice 
        + ", " + user.responses[entryN].answers.list_4415812_other);
    
    //hardware survey
    newUser.set("hardware", user.responses[entryN].answers.list_5364074_choice_6192385 + 
        ", " + user.responses[entryN].answers.list_5364074_choice_6192386 +
        ", " + user.responses[entryN].answers.list_5364074_choice_6192387 + 
        ", " + user.responses[entryN].answers.list_5364074_choice_6192388 + 
        ", " + user.responses[entryN].answers.list_5364074_choice_6192389 + 
        ", " + user.responses[entryN].answers.list_5364074_choice_6192390 + 
        ", " + user.responses[entryN].answers.list_5364074_choice_6192391 + 
        ", " + user.responses[entryN].answers.list_5364074_choice_6192392 + 
        ", " + user.responses[entryN].answers.list_5364074_choice_6192393 + 
        ", " + user.responses[entryN].answers.list_5364074_choice_6192394 + 
        ", " + user.responses[entryN].answers.list_5364074_choice_6192395 + 
        ", " + user.responses[entryN].answers.list_5364074_choice_6192396 + 
        ", " + user.responses[entryN].answers.list_5364074_other);
    //terms
    newUser.set("terms", user.responses[entryN].answers.terms_4607363);

    newUser.signUp(null, {
      success: function(newUser){
        //console.log("saved");
      },
      error: function(newUser, err) {
			//console.log("Error: " + err.code + " " + err.message);
      }
    });
  }
  });
  
  checkout(){
	  alert(1);
	  
  }
  
  
})
    
