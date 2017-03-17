function createEvent() {
  	var title = document.getElementById("title").value;
  	var date = document.getElementById("date").value;
  	var time = document.getElementById("time").value;
	var notes = document.getElementById("description").value;

  	// var dataString = "title=" + encodeURIComponent(title) + "date=" + encodeURIComponent(date) + "time=" + encodeURIComponent(time) + "description=" + encodeURIComponent(notes);
  	var dataString = "title=" + title + "&date=" + date + "&time=" + time + "&description=" + notes;
  	document.write(dataString);
  	var xmlHttp = new XMLHttpRequest();
  	xmlHttp.open("POST", "addEvent.php", true);
  	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  	xmlHttp.addEventListener("load", function(event){

  	}, false);
}

document.getElementById("save_btn").addEventListener("click", createEvent, false);
