 Parse.initialize("PRZCDqiKSpzjNuIGTEHj9jXKn6f1PRfAixB2nK2r", "GuD81fbE4prg1RdLLmJvhLdb8CBa21imyroGrMRk");    

var Hardware = Parse.Object.extend("Hardware");
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
          "<u><b>Condition</b></u>"+
          "</td>"+
          "<td>"+
          "<u><b>Available</b></u>"+
          "</td>"+
          "</tr>");
	// for loop
var count = 1;
	for(O in results){
	var t = results[O].get('Name');
	var r = results[O].get('Condition');
	var p = results[O].get('rented');
	if(results[O].get('rented')){
	p="no";
	}
	else{ p="yes";
	}
	$("#hovertable").append(
            "<tr class=element><td>"+
            (count)+
            "</td><td>"+
            t+
            "</td><td>"+
            r+
            "</td><td>"+
            p+
            "</td></tr>");
        count++;	
}
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});

