Parse.initialize("PRZCDqiKSpzjNuIGTEHj9jXKn6f1PRfAixB2nK2r", 
    "GuD81fbE4prg1RdLLmJvhLdb8CBa21imyroGrMRk");    
var Hardware = Parse.Object.extend("HW");
var query = new Parse.Query(Hardware);
query.descending("Available");
query.find({
  success: function(results) {
    // Successfully retrieved the object.
    $("#hovertable").append(
        "<tr><td></td>"+
        "<td>"+
        "<u><b>Name</b></u>"+
        "</td>"+
        "<td>"+
        "<u><b>Quantity</b></u>"+
        "</td>"+
        "<td>"+
        "<u><b>Available</b></u>"+
        "</td>"+
        "<td>"+
        "<u><b>Price</b></u>"+
        "</td>"+	  
        "</tr>");
    // for loop
    var count = 1;
    for(O in results){
      var t = results[O].get('Name');
      var r = results[O].get('Quantity');
      var g = results[O].get('Price');
      var p = results[O].get('Available');
      if(p == -1){ 
        p="Only at hackathons";
      } else if (p == 0) {
        p = "Out of Stock";
      }

      var text="Get this one!";
      if(p > 0) {
       $("#hovertable").append(
          "<tr value=\"" + t + "\" class=element>" +
          "<td>" + count + "</td>" + "<td>" +
          "<a href=\"purchase/checkout.html\" onclick=\"checkout()\">" +
          t + "</a>" + "</td><td>" + r + "</td><td>" + p + "</td><td>" +
          "$" + g + "</td></td></tr>");
      } else {
        $("#hovertable").append(
          "<tr value=\"" + t + "\" class=element>" +
          "<td>" + count + "</td>" + "<td>" +
          t + "</td><td>" + r + "</td><td>" + p + "</td><td>" +
          "$" + g + "</td></td></tr>");
      }
      count++;
    }
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});


function checkout(){
  $("#hovertable").on('click','tr',function(e){
    var id = $(this).attr('value');
    // alert(id);
    //instead of alerting, we need to move this into the local storage
    $.jStorage.set("item", id);
  });
}
