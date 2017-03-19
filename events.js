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
    var eventdiv = document.createElement("p");
    var br = document.createElement("br");
    var extraevents = document.createElement("p")
    extraevents.setAttribute("class", "extraevents");

    var numevents = jsonData.events.length;
    if (numevents < 2) {
      for (var i=0; i < jsonData.events.length; i++){
        eventdiv.appendChild(document.createTextNode(convert(jsonData.events[i].time)));
        eventdiv.appendChild(document.createTextNode(" " + jsonData.events[i].title));
        eventdiv.appendChild(document.createElement("br"));
      //  console.log(eventdiv);
        eventdiv.setAttribute("class", "events");
        eventdiv.setAttribute("id", jsonData.events[i].event_id);
        document.getElementById(sqlday).appendChild(eventdiv);
        }
    }
    else {
      for (var i=0; i < jsonData.events.length; i++){
        eventdiv.appendChild(document.createTextNode(convert(jsonData.events[i].time)));
        eventdiv.appendChild(document.createTextNode(" " + jsonData.events[i].title));
        eventdiv.appendChild(document.createElement("br"));
      //  console.log(eventdiv);
        eventdiv.setAttribute("class", "events");
        eventdiv.setAttribute("id", jsonData.events[i].event_id);
        if (i < 2) {
          document.getElementById(sqlday).appendChild(eventdiv);
        }
      }
      extraevents.appendChild(document.createTextNode(jsonData.events.length - 2 + " more events"));
      extraevents.setAttribute("id", sqlday);
      document.getElementById(sqlday).appendChild(extraevents);
    }
    // for (var i=0; i < jsonData.events.length; i++){
    //   if (i < 2) {
    //   eventdiv.appendChild(document.createTextNode(convert(jsonData.events[i].time)));
    //   eventdiv.appendChild(document.createTextNode(" " + jsonData.events[i].title));
    //   eventdiv.appendChild(document.createElement("br"));
    // //  console.log(eventdiv);
    //   eventdiv.setAttribute("class", "events");
    //   eventdiv.setAttribute("id", jsonData.events[i].event_id);
    //   document.getElementById(sqlday).appendChild(eventdiv);
    //   }
    //
    //   else {
    //     console.log("in extra");
    //     extraevents.appendChild(document.createTextNode(jsonData.events.length - 2 + " more events"));
    //     extraevents.setAttribute("id", sqlday);
    //     document.getElementById(sqlday).appendChild(extraevents);
    //     break;
    //   }
    //
    // }


    }




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

function convert(timeinput) {
  time = timeinput.split(':'); // convert to array

  var hour = Number(time[0]);
  var minutes = Number(time[1]);
  var seconds = Number(time[2]);

  // calculate
  var timeValue;

  if (hour > 0 && hour <= 12) {
    timeValue= "" + hour;
  } else if (hour > 12) {
    timeValue= "" + (hour - 12);
  } else if (hour == 0) {
    timeValue= "12";
  }
  if (minutes == 0) {
    timeValue += (hour >= 12) ? "pm" : "am";
  }
  else {
  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
  timeValue += (hour >= 12) ? "pm" : "am";  // get AM/PM
  }
  return timeValue;
}
