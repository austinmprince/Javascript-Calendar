var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var loggedin = false;
(function() {
    Date.prototype.deltaDays = function(c) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + c)
    };
    Date.prototype.getSunday = function() {
        return this.deltaDays(-1 * this.getDay())
    }
})();

function Week(c) {
    this.sunday = c.getSunday();
    this.nextWeek = function() {
        return new Week(this.sunday.deltaDays(7))
    };
    this.prevWeek = function() {
        return new Week(this.sunday.deltaDays(-7))
    };
    this.contains = function(b) {
        return this.sunday.valueOf() === b.getSunday().valueOf()
    };
    this.getDates = function() {
        for (var b = [], a = 0; 7 > a; a++) b.push(this.sunday.deltaDays(a));
        return b
    }
}

function Month(c, b) {
    this.year = c;
    this.month = b;
    this.nextMonth = function() {
        return new Month(c + Math.floor((b + 1) / 12), (b + 1) % 12)
    };
    this.prevMonth = function() {
        return new Month(c + Math.floor((b - 1) / 12), (b + 11) % 12)
    };
    this.getDateObject = function(a) {
        return new Date(this.year, this.month, a)
    };
    this.getWeeks = function() {
        var a = this.getDateObject(1),
            b = this.nextMonth().getDateObject(0),
            c = [],
            a = new Week(a);
        for (c.push(a); !a.contains(b);) a = a.nextWeek(), c.push(a);
        return c
    }
};

var currentDate = new Date();
var month = currentDate.getMonth();
var currentYear = currentDate.getFullYear();
// For our purposes, we can keep the current month in a variable in the global scope
var currentMonth = new Month(currentYear, month); // currentMonth
var tempMonth = month+1;
var tempDate = new Date(tempMonth +' 1 ,'+currentYear);
var tempweekday= tempDate.getDay();
var tempweekday2 = tempweekday;
//console.log(tempDate);

updateCalendar(loggedin);

// Change the month when the "next" button is pressed
document.getElementById("next_month_btn").addEventListener("click", function(event){
	currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
	if (currentMonth.month == 0){
	 	currentYear+=1;
	}
	updateCalendar(loggedin); // Whenever the month is updated, we'll need to re-render the calendar in HTML
	//alert("The new month is "+currentMonth.month+" "+currentMonth.year);

}, false);

document.getElementById("prev_month_btn").addEventListener("click", function(event){
	currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
	if (currentMonth.month == 11) {
		currentYear-=1;
	}
	updateCalendar(loggedin); // Whenever the month is updated, we'll need to re-render the calendar in HTML
	//alert("The new month is "+currentMonth.month+" "+currentMonth.year);
}, false);


// This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
// it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
function updateCalendar(logincheck){

	clearCalendar()
	var weeks = currentMonth.getWeeks();
	document.getElementById('month_display').innerHTML = monthNames[currentMonth.month] + " " + currentYear;
	for(var w in weeks){
		var days = weeks[w].getDates();
		var weekrow = document.createElement("tr");

		//alert("Week starting on "+days[0]);

		for(var d in days){
			if (days[d].getMonth() != currentMonth.month) {
				var tablecell = document.createElement("td");
				tablecell.appendChild(document.createTextNode(""));
				weekrow.appendChild(tablecell);
        //console.log(days[d]);


			}
			// You can see console.log() output in your JavaScript debugging tool, like Firebug,
			// WebWit Inspector, or Dragonfly.
			else {

			//	console.log(days[d]);

				var tablecell = document.createElement("td");
				tablecell.appendChild(document.createTextNode(days[d].getDate()));
				tablecell.setAttribute("id", days[d].toISOString().substring(0,10));
        tablecell.setAttribute("class", "editable");
				weekrow.appendChild(tablecell);
        var sqlday = days[d].toISOString().substring(0,10);
        if (logincheck == true) {
          //console.log(sqlday);
          //getEvents(sqlday);
        //  console.log(getEvents(sqlday));
        getEvents(sqlday);

        }


		}
		document.getElementById('calendarmain').appendChild(weekrow);
		}
	}
}

function clearCalendar() {
	var main = document.getElementById('calendarmain');
	while (main.childNodes.length > 2) {
    main.removeChild(main.lastChild);
}


}
$('.editable').click(function() {     // function_on
  console.log("row function");
  $("#mydialog").dialog();
});

$('.events').hover(function() {
  console.log("hover func");
});
