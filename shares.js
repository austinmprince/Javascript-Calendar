function shareCalendar(friend_name){
  var dataString = "friend_name=" + encodeURIComponent(friend_name);

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('POST', 'share.php', true);
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlHttp.addEventListener("load", function(event){
  	console.log(event.target.responseText);
  	var jsonData = JSON.parse(event.target.responseText);
  	console.log(jsonData);
  }, false);
  xmlHttp.send(dataString);
}

function loadSharedCalendars(){
	//get all friends of this user
	var xmlHttp = new XMLHttpRequest();
  	xmlHttp.open('POST', 'getFriends.php', true);
  	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  	xmlHttp.addEventListener("load", function(event){
  		console.log(event.target.responseText);
  		var jsonData = JSON.parse(event.target.responseText);
  		if(jsonData.success){
  			for(var i=0; i<jsonData.friends.length; i++){
  				console.log(jsonData.friends[i].id);
  				var dataString = "friend_id=" + encodeURIComponent(jsonData.friends[i].id);
  				var xmlHttp_events = new XMLHttpRequest();
  				xmlHttp_events.open('POST', 'getFriendsEvents.php', true);
  				xmlHttp_events.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  				xmlHttp_events.addEventListener("load",function(aEvent){
  					var aJsonData = JSON.parse(aEvent.target.responseText);
  					if(aJsonData.success){
  						for(var i=0; i<aJsonData.events.length; i++){
								var day = aJsonData.events[i].date;
								var date = new Date(day);
							  var sqlday = date.toISOString().substring(0,10);
                console.log(sqlday);
							  var cell = document.getElementById(sqlday);
								var eventdiv = document.createElement("div");
  							eventdiv.appendChild(document.createTextNode(convert(aJsonData.events[i].time)));
  							eventdiv.appendChild(document.createTextNode(" " + aJsonData.events[i].title));
  							eventdiv.appendChild(document.createElement("br"));
  							eventdiv.setAttribute("class", "events");
  							eventdiv.setAttribute("class", "sharedEvents");
  							eventdiv.setAttribute("id", aJsonData.events[i].event_id);
                if(cell != null){
                  cell.appendChild(eventdiv);
                }
  						}
  					}
  				},false);
  				xmlHttp_events.send(dataString);
  			}
  		}
  	}, false);
	//get event for each friend
	//put in calendar
	xmlHttp.send(null);
}

