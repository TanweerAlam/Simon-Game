var breaklength = 5;
var sessionlength = 25;
var buzzer = new Audio('http://www.orangefreesounds.com/wp-content/uploads/2016/06/Ringing-clock.mp3?_=1');

var pause = true;
var counting;
var deadline = sessionlength * 60;
var min, secs;

//DOMs 
var title = document.getElementById('title');
var breakPeriod = document.getElementById('breakPeriod');
var sessionPeriod = document.getElementById('sessionPeriod');
var timecounter = document.getElementById('timer');

//Onload break and session is updated
window.addEventListener('load', function(){
	document.getElementById('breakPeriod').innerHTML = breaklength;
	document.getElementById('sessionPeriod').innerHTML = sessionlength;
	document.getElementById('timer').innerHTML = sessionlength;
});

//function to lessen breaklength
function minusBreak(){
  if(breaklength > 1){
      breaklength--;
      breakPeriod.innerHTML = breaklength; 
  }
}

//function to increase breaklength
function plusBreak(){
  if (breaklength < 30) {
    breaklength++;
    breakPeriod.innerHTML = breaklength; 
  }
}

//function to lessen sessionlength
function minusSession(){
  if(sessionlength > 1){
    sessionlength--;
 	updateClock();
  }
}

//function to increase sessionlength
function plusSession(){
  if (sessionlength < 50) {
    sessionlength++;
    updateClock();
  }
}

// function startTimer(){
// 	var time = sessionlength * 60;
// 	var min, secs;
// 	counting = setInterval(function(){
// 		secs = parseInt(time % 60, 10);
// 		min = parseInt(time / 60, 10);

// 		min = min < 10 ? '0'+min : min;
// 		secs = secs < 10 ? '0'+secs : secs;

// 		timer.innerHTML = min + ':' + secs;
// 		--time;
// 		if (time == -1) {
// 			var title = document.getElementById('title');
// 			if (title.innerText == "Session") {
// 				console.log('Break!!!');
// 				document.getElementById('title').innerText = 'Break!!!';
// 				buzzer.play();
// 				time = breaklength * 60;
// 			}
// 			else{
// 				console.log('Session');
// 				document.getElementById('title').innerText = 'Session';
// 				buzzer.play();
// 				time = sessionlength * 60;
// 			}
// 		}
// 		console.log(secs);
// 	},1000)
// }

//function to calculate mins and secs
function timer(){
	secs = parseInt(deadline % 60, 10);
	min = parseInt(deadline / 60, 10);

	min = min < 10 ? '0'+min : min;
	secs = secs < 10 ? '0'+secs : secs;
	console.log(min+":"+secs);
	document.getElementById("timer").innerHTML = min + ':' + secs;
	--deadline;
	if (deadline == -1) {
		if (title.innerText == "Session") {
			console.log('Break!!!');
			document.getElementById('title').innerText = 'Break!!!';
			buzzer.play();
			deadline = breaklength * 60;
		}
		else{
			console.log('Session');
			document.getElementById('title').innerText = 'Session';
			buzzer.play();
			deadline = sessionlength * 60;
		}
	}
}

//function to update the timer on sessionlength change
function updateClock(){
    deadline = sessionlength * 60;
    clearInterval(counting);
    sessionPeriod.innerHTML = sessionlength;
    title.innerText = "Session";
    timecounter.innerHTML = sessionlength;
}

document.getElementById('minusBreak').addEventListener('click', minusBreak, false);
document.getElementById('plusBreak').addEventListener('click', plusBreak, false);
document.getElementById('minusSession').addEventListener('click', minusSession, false);
document.getElementById('plusSession').addEventListener('click', plusSession, false);

document.getElementById('clock').addEventListener('click', function(){
	if (pause) {
		counting = setInterval(timer, 1000);
		pause = false;
	}
	else{
		clearInterval(counting);
		pause = true;
	}
}, false);
