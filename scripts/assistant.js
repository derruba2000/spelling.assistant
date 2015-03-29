'use strict';

var maxvisiblerows = 5;
var exerciselist;
var viewlist = 0;
var exercisetime;
var steptime;
var timerVar;

function createlist() {

    maxvisiblerows = 5;

    var textlist = document.getElementById("word list").value;
    var strlist = textlist.split(";");
    var radios = document.getElementsByName("Options");
    var radiooption;

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            console.log("Options selected:" + radios[i].value);
            radiooption= radios[i].value;
            break;
        }
    }

    for (var k = 0; k < strlist.length; k++) {
        console.log("->" + k + ":" + strlist[k]);
    }

    exerciselist = strlist.slice();
    // Reverse Order
    if (2==radiooption){
        for (var k = 0; k < strlist.length; k++) {
          exerciselist[k] = strlist[strlist.length -(1+k)];
        }
    }
    

    // Random Order
    if (3==radiooption){
        var randomcontrol=strlist.slice();;
        for (var k = 0; k < strlist.length; k++) {
            randomcontrol[k]=-1;
        }
        for (var k = 0; k < strlist.length; k) {
            var tmp = Math.round(Math.random()*(strlist.length-1));
            var exists = false;
            // checks if number exists in array
            for (var k2=0; k2<k; k2++){
                if (randomcontrol[k2] == tmp){
                    exists = true;
                }
            }
            if (false==exists){
                console.log("Added " + strlist[tmp] + ":" + tmp);
                exerciselist[k]=strlist[tmp];
                randomcontrol[k]=tmp;
                k++;
            }
          exerciselist[k] = strlist[strlist.length -(1+k)];
        }
    }

    exercisetime = new Date();
    steptime = new Date();
    timerVar = setInterval(function(){myTimer()},1000);
    
    if (strlist.length < maxvisiblerows) maxvisiblerows = strlist.length;
    renderTable(0);
    
}

function nextword(){
    renderTable(++viewlist);
    steptime = new Date();
}

function previousword(){
    renderTable(--viewlist);
    steptime = new Date();
}


function renderTable(l) {
    // Renders List
    var table = document.getElementById("wordtable");
    document.getElementById("nextbutton").disabled = false;
    document.getElementById("previousbutton").disabled = false;
  
    if (l<= 0){
        l = 0;
        viewlist=0;
        document.getElementById("nextbutton").disabled = false;
        document.getElementById("previousbutton").disabled = true;
    } 
    if (l== exerciselist.length) {
        l=exerciselist.length-1;
        viewlist=l;
        document.getElementById("nextbutton").disabled = true;
    }
  
    // delete rows
    var l2 = table.rows.length;
    if (table.rows.length > 0) {
        for (var k = 0; k < l2; k++){
            table.deleteRow(0);
        }
    }

    l2 = maxvisiblerows;
    if (l + maxvisiblerows >= exerciselist.length) l2 = exerciselist.length - l;

    for (var k = 0; k < l2; k++) {
        var row = table.insertRow(k);
        var newcell = row.insertCell(0);
        newcell.innerHTML = "(" + (l+1+k)+ "/" + exerciselist.length + ")" + " " + exerciselist[k+l];
        
        if (0==k){
         newcell.className = "danger";
         document.getElementById("currentword").innerHTML="<h3>"+exerciselist[k+l] +"</h3>";
        
         var tts = '<iframe src="http://translate.google.com/translate_tts?ie=UTF-8&tl=en-gb&q=' ;
         tts+=exerciselist[k+l];
         
         tts += '"> <p>Your browser does not support iframes.</p></iframe>';
        
         document.getElementById("ttstag").innerHTML=tts;
         
        }

    }
}


function myTimer() {
    var d = new Date();

    document.getElementById("timecount").innerHTML = "<p><strong> Total time:" + dateDiff(exercisetime,d) + "</strong></p> Step Time:" + dateDiff(steptime,d);
}


function dateDiff(date1, date2){

    
    var diff = (date2 - date1)/1000;
    var diff = Math.abs(Math.floor(diff));
    
    var days = Math.floor(diff/(24*60*60));
    var leftSec = diff - days * 24*60*60;
    
    var hrs = Math.floor(leftSec/(60*60));
    var leftSec = leftSec - hrs * 60*60;
      
    var min = Math.floor(leftSec/(60));
    var leftSec = leftSec - min * 60;
    
    if (hrs < 10) hrs= "0" + hrs;
    if (min < 10) min= "0" + min;
    if (leftSec < 10) leftSec= "0" + leftSec;
    
    return hrs + ":" + min + ":" + leftSec;
    
 }
