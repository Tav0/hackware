$(function() {
   
      Parse.$ = jQuery;

      Parse.initialize("przcdqikspzjnuigtehj9jxkn6f1prfaixb2nk2r", "gud81fbe4prg1rdllmjvhldb8cba21imyrogrmrk");
});
      
$('.popupBoxContent').on('submit', function(e){

  //prevent default submit event
  e.preventDefault;

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
});
    
