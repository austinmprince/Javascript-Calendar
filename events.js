function getEvents(day) {

  var date = new Date(day);
  var sqlday = date.toISOString().substring(0,10);
  //console.log(sqlday);
  var dataString = "date=" + encodeURIComponent(sqlday);

  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "getevents.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event){

    console.log(event.target.responseText);
    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object

    if(jsonData.false){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData

    alert("Events fetched failed");


  }
  if (jsonData.exists) {

    //console.log(jsonData.date);
    var eventdiv = document.createElement("span");
    var br = document.createElement("br");
    for (var i=0; i < jsonData.events.length; i++){
      eventdiv.appendChild(document.createTextNode(jsonData.events[i].title));
      document.getElementById(sqlday).appendChild(br);
      eventdiv.setAttribute("class", "events");
      eventdiv.setAttribute("id", jsonData.events[i].event_id);
      document.getElementById(sqlday).appendChild(eventdiv);

    }

    // var eventTitle = document.createTextNode(jsonData.title)
    // // document.getElementById(jsonData.date).append(br);
    // document.getElementById(jsonData.date).append(eventTitle);
  }
  // else{
  //   alert("Event fetch fail");
  // }
}, false); // Bind the callback to the load event
xmlHttp.send(dataString); // Send the data

}
function createEvent() {
  	var title = document.getElementById("title").value;
  	var date = document.getElementById("date").value;
  	var time = document.getElementById("time").value;
	  var notes = document.getElementById("description").value;
    console.log(title);
    console.log(date);
    console.log(time);
  	var dataString = "title=" + encodeURIComponent(title) + "&date=" + encodeURIComponent(date) + "&time=" + encodeURIComponent(time) + "&description=" + encodeURIComponent(notes);
  	// var dataString = "title=" + encodeURIComponent(title) + "&date=" + date + "&time=" + time + "&description=" + notes;
  	// document.write(dataString);
  	var xmlHttp = new XMLHttpRequest();
  	xmlHttp.open("POST", "addEvent.php", true);
  	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");// It's easy to forget this line for POST requests

  	xmlHttp.addEventListener("load", function(event){
      console.log(event.target.responseText);
      var jsonData = JSON.parse(event.target.responseText);
      if (jsonData.success) {
        alert("Event added succesfully");
        updateCalendar(loggedin);
      }
      else {
        alert("Event failed to add " + jsonData.message);
      }

  	}, false);
    xmlHttp.send(dataString);
}

document.getElementById("save_btn").addEventListener("click", createEvent, false);
