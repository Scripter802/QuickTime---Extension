
var h1 = document.getElementById("mainTxt"),
    seconds = 0, minutes = 0, hours = 0,
    t;
var timerRunning = false, yellow = false;
var finalS = 0,finalM = 0,finalH = 0;
var todayS = 0, todayM = 0, todayH = 0;

var date,timeMili;
 

//VARIABLE SAVE ---------------------------------------------------------------------------------------------------

// POSLEDNJI VARIABLE SAVE

    	document.getElementById("lastRun").textContent = "";

chrome.storage.local.get(['f_H'], function(result) {
     finalH = result.f_H;

     if(finalH < 10){
     	               document.getElementById("lastRun").textContent +="0"+ finalH + ":";
     }else{
     	               document.getElementById("lastRun").textContent += finalH + ":";
     }

});


chrome.storage.local.get(['f_M'], function(result) {
     finalM = result.f_M;

     if(finalM < 10){
     	               document.getElementById("lastRun").textContent +="0"+ finalM + ":";
     }else{
     	               document.getElementById("lastRun").textContent += finalM + ":";
     }
});


chrome.storage.local.get(['f_S'], function(result) {
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
  if(result.t_S === undefined){}else{
  	     todayS = result.t_S;
  }


     if(todayS < 10){
     	               document.getElementById("todayAll").textContent +="0"+ todayS;
     }else{
     	               document.getElementById("todayAll").textContent += todayS;
     }

});


//VARIABLE SAVE ---------------------------------------------------------------------------------------------------

//PROVERAVA DA LI JE DRUGI DAN-----------------------------------------------




       var d_new = new Date();
       var n_new = d_new.getDate();

       console.log(localStorage.getItem('dateStarted'));
       
       var n_old = JSON.parse(localStorage.getItem('dateStarted'));


    if(n_new != n_old){

       chrome.storage.local.set({'t_S': 0}, function() {
     });

	   chrome.storage.local.set({'t_M': 0}, function() {
     });

		chrome.storage.local.set({'t_H': 0}, function() {
     });




    }





//PROVERA DA LI JE UPALJEN ILI NIJE-------------------------------------------
var tempIsRunnig = JSON.parse(localStorage.getItem('isTimerRunning'));
var tempMili = JSON.parse(localStorage.getItem('startMili'));
var finalMili;

var currDate = new Date();
var currMili = currDate.getTime();

if(tempIsRunnig == true){


	document.getElementById("mainTxt").textContent="Loading...";

	document.body.style.setProperty('--dot-color',"#C05341");
	document.body.style.setProperty('--circle-color',"#C05341");

 finalMili = ~~((currMili - tempMili)/1000);

 console.log("Final Sekunde " + finalMili);


secondsToHms(finalMili);


timerRunning = true;


}else if(tempIsRunnig == false){

    document.body.style.setProperty('--dot-color',"#81B898");
	document.body.style.setProperty('--circle-color',"#81B898");


timerRunning = false;


    }else{

    document.body.style.setProperty('--dot-color',"#81B898");
	document.body.style.setProperty('--circle-color',"#81B898");

timerRunning = false;
 }



function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    console.log("H su " + h);
    console.log("M su " + m);
    console.log("S su " + s);

    hours = h;
    minutes = m;
    seconds = s;


    timer();
}








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


     date = new Date();
     timeMili = date.getTime();


    localStorage.setItem("startMili", timeMili);

    localStorage.setItem("isTimerRunning", timerRunning);



       var d = new Date();
       var n = d.getDate();

        localStorage.setItem("dateStarted", n);

}


function StopTimer(){
	    clearTimeout(t);
   
   	document.body.style.setProperty('--dot-color',"#F9D945");
		document.body.style.setProperty('--circle-color',"#F9D945");

		 chrome.browserAction.setIcon({path: "icon1-38.png"});

	    		timerRunning = false;

        localStorage.setItem("isTimerRunning", timerRunning);


	    		yellow = true;
}



function ClearTimer(){

	var temp;

	 h1.textContent = "00:00:00";

    finalS = seconds;
    finalM = minutes;
    finalH = hours;

    todayS = todayS + finalS;
    todayM = todayM + finalM;
    todayH = todayH + finalH;

    if (todayS >= 60) {
    	temp =  Math.floor(todayS / 60)
    	    todayM += Math.floor(todayS / 60);
    	    todayS += todayS - temp * 60;
        }


    if (todayM >= 60) {
    	temp =  Math.floor(todayM / 60)
    	    todayH += Math.floor(todayM / 60);
    	    todayM += todayM - temp * 60;
        }



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
     });

		chrome.storage.local.set({'f_M': finalM}, function() {
     });

			chrome.storage.local.set({'f_H': finalH}, function() {
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
     });

		chrome.storage.local.set({'t_M': todayM}, function() {
     });

			chrome.storage.local.set({'t_H': todayH}, function() {
     });




    seconds = 0; minutes = 0; hours = 0;

         document.body.style.setProperty('--dot-color',"#81B898");
		document.body.style.setProperty('--circle-color',"#81B898");

		  timerRunning = false;



          yellow = false;
}

