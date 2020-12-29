
var h1 = document.getElementById("mainTxt"),
    seconds = 0, minutes = 0, hours = 0,
    t;
var timerRunning = false, yellow = false;
var finalS = 0,finalM = 0,finalH = 0;
var todayS = 0, todayM = 0, todayH = 0;



  var d = new Date();

  var currentDay = d.getDay();
  var currentHour = d.getHours();
  var currentMinute = d.getMinutes();
  var currentSec = d.getSeconds();

  
  var exitD = 0,exitH = 0,exitM = 0,exitS = 0, exitIsRunning;
 

//VARIABLE SAVE ---------------------------------------------------------------------------------------------------

// POSLEDNJI VARIABLE SAVE

    	document.getElementById("lastRun").textContent = "";

chrome.storage.local.get(['f_H'], function(result) {
  console.log('Sati currently is ' + result.f_H);
     finalH = result.f_H;

     if(finalH < 10){
     	               document.getElementById("lastRun").textContent +="0"+ finalH + ":";
     }else{
     	               document.getElementById("lastRun").textContent += finalH + ":";
     }

});


chrome.storage.local.get(['f_M'], function(result) {
  console.log('Minuti currently is ' + result.f_M);
     finalM = result.f_M;

     if(finalM < 10){
     	               document.getElementById("lastRun").textContent +="0"+ finalM + ":";
     }else{
     	               document.getElementById("lastRun").textContent += finalM + ":";
     }
});


chrome.storage.local.get(['f_S'], function(result) {
  console.log('Sekunde currently is ' + result.f_S);
     finalS = result.f_S;

     if(finalS < 10){
     	               document.getElementById("lastRun").textContent +="0"+ finalS;
     }else{
     	               document.getElementById("lastRun").textContent += finalS;
     }

});




// THAT DAY VARIABLE SAVE

    	document.getElementById("todayAll").textContent = "";


chrome.storage.local.get(['t_H'], function(result) {
  console.log('Sati currently is ' + result.t_H);

  if(result.t_H === undefined){}else{
  	     todayH = result.t_H;
  }

     if(todayH < 10){
     	               document.getElementById("todayAll").textContent +="0"+ todayH + ":";
     }else{
     	               document.getElementById("todayAll").textContent += todayH + ":";
     }

});


chrome.storage.local.get(['t_M'], function(result) {
  console.log('Minuti currently is ' + result.t_M);

  if(result.t_M === undefined){}else{
  	     todayM = result.t_M;
  }

     if(todayM < 10){
     	               document.getElementById("todayAll").textContent +="0"+ todayM + ":";
     }else{
     	               document.getElementById("todayAll").textContent += todayM + ":";
     }
});


chrome.storage.local.get(['t_S'], function(result) {
  console.log('Sekunde currently is ' + result.t_S);


  if(result.t_S === undefined){}else{
  	     todayS = result.t_S;
  }


	console.log("DAANASS MAXX:" + todayS);
console.log("SACUVANIII MAXX:" + result.t_S);


     if(todayS < 10){
     	               document.getElementById("todayAll").textContent +="0"+ todayS;
     }else{
     	               document.getElementById("todayAll").textContent += todayS;
     }

});


//VARIABLE SAVE ---------------------------------------------------------------------------------------------------



chrome.storage.local.get(['startedTheTimer'], function(result) {
     exitIsRunning = result.startedTheTimer;

    if(exitIsRunning == true){

//treba da se povuku sve exit vrednosti
           
chrome.storage.local.get(['startD'], function(result) {
     exitD = result.startD;





});  





    }

});










//PROVERAVA DA LI DA PRIKAZE SVE NORMALNO ILI DA PRIKAZE VREME UMESTO STARTA ----------------------------------------------------



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

		chrome.storage.local.set({'startedTheTimer': timerRunning}, function() {});


		chrome.storage.local.set({'startD': currentDay}, function() {});
	    chrome.storage.local.set({'startH': currentHour}, function() {});
		chrome.storage.local.set({'startM': currentMinute}, function() {});
		chrome.storage.local.set({'startS': currentSec}, function() {});

}


function StopTimer(){
	    clearTimeout(t);
   
   	document.body.style.setProperty('--dot-color',"#F9D945");
		document.body.style.setProperty('--circle-color',"#F9D945");

		 chrome.browserAction.setIcon({path: "icon1-38.png"});

	    		timerRunning = false;

		chrome.storage.local.set({'startedTheTimer': timerRunning}, function() {});


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


    	document.getElementById("lastRun").textContent = "";

     if(finalH < 10){
     	              	document.getElementById("lastRun").textContent+="0"+ finalH + ":";
     }else{
     	              	document.getElementById("lastRun").textContent+=finalH + ":";
     }

     if(finalM < 10){
     	              	document.getElementById("lastRun").textContent+="0"+ finalM + ":";
     }else{
     	              	document.getElementById("lastRun").textContent+=finalM + ":";
     }

          if(finalS < 10){
     	              	document.getElementById("lastRun").textContent+="0"+ finalS;
     }else{
     	              	document.getElementById("lastRun").textContent+=finalS;
     }



	chrome.storage.local.set({'f_S': finalS}, function() {
    console.log('Sacuvane sekunde');
     });

		chrome.storage.local.set({'f_M': finalM}, function() {
    console.log('Sacuvane minuti');
     });

			chrome.storage.local.set({'f_H': finalH}, function() {
    console.log('Sacuvane sati');
     });



    	document.getElementById("todayAll").textContent = "";

     if(todayH < 10){
     	              	document.getElementById("todayAll").textContent+="0"+ todayH + ":";
     }else{
     	              	document.getElementById("todayAll").textContent+=todayH + ":";
     }

     if(todayM < 10){
     	              	document.getElementById("todayAll").textContent+="0"+ todayM + ":";
     }else{
     	              	document.getElementById("todayAll").textContent+=todayM + ":";
     }

          if(todayS < 10){
     	              	document.getElementById("todayAll").textContent+="0"+ todayS;
     }else{
     	              	document.getElementById("todayAll").textContent+=todayS;
     }


	chrome.storage.local.set({'t_S': todayS}, function() {
    console.log('Sacuvane sekunde -- danas');
     });

		chrome.storage.local.set({'t_M': todayM}, function() {
    console.log('Sacuvane minuti -- danas');
     });

			chrome.storage.local.set({'t_H': todayH}, function() {
    console.log('Sacuvane sati -- danas');
     });




    seconds = 0; minutes = 0; hours = 0;

         document.body.style.setProperty('--dot-color',"#81B898");
		document.body.style.setProperty('--circle-color',"#81B898");

		  timerRunning = false;

		chrome.storage.local.set({'startedTheTimer': timerRunning}, function() {});

          yellow = false;
}

