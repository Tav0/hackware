 Parse.initialize("PRZCDqiKSpzjNuIGTEHj9jXKn6f1PRfAixB2nK2r", "GuD81fbE4prg1RdLLmJvhLdb8CBa21imyroGrMRk");    
var Hardware = Parse.Object.extend("HW");
var query = new Parse.Query(Hardware);
query.ascending("Name");
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
          "</tr>");
	// for loop
var count = 1;
	for(O in results){
	var t = results[O].get('Name');
	var r = results[O].get('Quantity');
	var p = results[O].get('Available');
	var text="Get this one!";
	$("#hovertable").append(
            "<tr class=element>"+
			"<td>"+count+"</td>"+
			"<td>"+
            "<a href=\"checkout.html\" onclick=\"checkout()\">" +t+"</a>"+
            "</td><td>"+
            r+
            "</td><td>"+
            p+
		  "</td>"+
            "</td></tr>");
        count++;	
	}
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
	

function checkout(){
  
  alert("asdfsdf");
  
}