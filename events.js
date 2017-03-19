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
    var eventdiv = document.createElement("div");
    var br = document.createElement("br");
    for (var i=0; i < jsonData.events.length; i++){
      eventdiv.appendChild(document.createTextNode(jsonData.events[i].title));
      eventdiv.appendChild(br);
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

function saveChanges(){
    var title = document.getElementById("title").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var notes = document.getElementById("description").value;
    var event_id = document.getElementById("e_id").value;

    var dataString = "title=" + encodeURIComponent(title) + "&date=" + encodeURIComponent(date) + "&time=" + encodeURIComponent(time) + "&description=" + encodeURIComponent(notes) + "&event_id=" + encodeURIComponent(event_id);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "saveChanges.php", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.addEventListener("load", function(event){
      var jsonData = JSON.parse(event.target.responseText);
      if(jsonData.success){
        $('#title').val("");
        $('#description').val("");
        $('#date').val("");
        $('#time').val("");
        $('#save_btn').show();
        $('#save_changes_btn').hide();
        updateCalendar(loggedin);
      }else{
        alert("Event failed to edit");
      }

    }, false);
    xmlHttp.send(dataString);
}

document.getElementById("save_changes_btn").addEventListener("click", saveChanges, false);

function editEvent(event_id){
  var dataString = "event_id=" + encodeURIComponent(event_id);
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", "editEvent.php", true);
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttp.addEventListener("load", function(event){
    var jsonData = JSON.parse(event.target.responseText);
    if(jsonData.success){
      var title_elem = $('#title');
      var description_elem = $('#description');
      var date_elem = $('#date');
      var time_elem = $('#time');
      var save_btn = $('#save_btn');
      var save_changes_btn = $('#save_changes_btn');
      var dialog_box = $('#mydialog');

      // var save_changes_btn = document.createElement("INPUT");
      // save_changes_btn.setAttribute("type","submit");
      // save_changes_btn.setAttribute("value","Save Changes");
      // save_changes_btn.setAttribute("id","save_changes_btn");
      // dialog_box.append(save_changes_btn);

      var event_id_elem = document.createElement('INPUT');
      event_id_elem.setAttribute("type", "hidden");
      event_id_elem.setAttribute("name", "event_id");
      event_id_elem.setAttribute("value", event_id);
      event_id_elem.setAttribute("id", "e_id");
      dialog_box.append(event_id_elem);

      title_elem.val(jsonData.title);
      description_elem.val(jsonData.description);
      date_elem.val(jsonData.date);
      time_elem.val(jsonData.time);
      save_changes_btn.show();
      // save_changes_btn.css("visibility","visible");
      save_btn.hide();
    }else{
      alert("Event not found");
    }
  }, false);
  xmlHttp.send(dataString);
}
