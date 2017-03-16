function getEvents(day) {
  var date = new Date(day);
  var sqlday = date.toISOString().substring(0,10);
  console.log(sqlday);
  var dataString = "date=" + encodeURIComponent(sqlday);
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "getevents.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event){
    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    console.log(event.target.responseText);
    if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData

    alert("Events fetched success");


  }
  else{
    alert("Event fetch fail");
  }
}, false); // Bind the callback to the load event
xmlHttp.send(dataString); // Send the data
}
