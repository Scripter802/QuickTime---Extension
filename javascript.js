
var h1 = document.getElementById("mainTxt"),
    seconds = 0, minutes = 0, hours = 0,
    t;
var timerRunning = false, yellow = false;
var finalS,finalM,finalH;
var todayS = 0, todayM = 0, todayH = 0;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}
//timer();

document.getElementById("startBtn").addEventListener("click", ChangeTimerState, false);

function ChangeTimerState(){

    if(timerRunning == false && yellow == false){
    	StartTimer();
    }else if(timerRunning == true && yellow == false){
           StopTimer();
    }else if(timerRunning == false && yellow == true){
    	  ClearTimer();
    }

}




function StartTimer(){


 chrome.browserAction.setIcon({path: "icon-38.png"});


	document.getElementById("mainTxt").textContent="00:00:00";
	document.body.style.setProperty('--dot-color',"#C05341");
		document.body.style.setProperty('--circle-color',"#C05341");
		timer();

		timerRunning = true;
}


function StopTimer(){
	    clearTimeout(t);
   
   	document.body.style.setProperty('--dot-color',"#F9D945");
		document.body.style.setProperty('--circle-color',"#F9D945");

		 chrome.browserAction.setIcon({path: "icon1-38.png"});

	    		timerRunning = false;
	    		yellow = true;
}

function ClearTimer(){

    console.log("ClearFunkcija");


	 h1.textContent = "00:00:00";

    finalS = seconds;
    finalM = minutes;
    finalH = hours;

    todayS = todayS + finalS;
    todayM = todayM + finalM;
    todayH = todayH + finalH;

	document.getElementById("lastRun").textContent= finalH+":"+finalM+":"+finalS;

	document.getElementById("todayAll").textContent= todayH+":"+todayM+":"+todayS;


    seconds = 0; minutes = 0; hours = 0;

         document.body.style.setProperty('--dot-color',"#81B898");
		document.body.style.setProperty('--circle-color',"#81B898");

		  timerRunning = false;
          yellow = false;
}