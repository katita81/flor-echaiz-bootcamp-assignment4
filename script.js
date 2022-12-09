var sec=75;// total seconds given.
var q = ["q1", "q2", "q3", "q4", "q5"];//array of questions.
var ans = ["alert", "parentheses", "all of the above", "quotes", "console.log"];// array of answers.
var countRights = 0;
var countWrongs = 0;
var result = "";// to store Right or Wrong answer.


function clearClass() {// to make elements not visible.
    const remove = (clear) => document.querySelectorAll(clear).forEach(el => el.remove());
    remove(".clear");
}

function timer() {// to set timer in decreasing seconds.
    var interval = null;
    interval = setInterval(function () {
        if (sec < 0 || sec === 0) {
            sec = 0;
            clearInterval(interval);
        }
        document.getElementById("time").innerHTML = "Time:" + sec;
        sec--;
        if (sec < 0 || sec === 0) {
            document.getElementById("q" + (q)).style.display = "none";//it times is gone the following question is not display.
            document.getElementById("submit").style.display = "block";// the submit element that holds the phrase:" all Done!" is displayed.
            document.getElementById("feedback").innerHTML = result; // the result :right or wrong is displayed accordingly. 
        }
    }
        , 1000);
}

function showQuestion(q) {// to make relevant question visible. 1st it shows the first question then, it disappear and show the next question with the result
                          //  of the previous question. unless the time is out then no more questions are displayed
    document.getElementById("q" + q).style.display = "block";
    if (sec < 0 || sec === 0) {
        document.getElementById("q" + (q)).style.display = "none";   
    }
    if (q > 1) {
        document.getElementById("q" + (q - 1)).style.display = "none";
        document.getElementById("feedback").innerHTML = result;
    }
}

function chosen(q, r) {// to store the alternative chosen
    var alt = document.getElementById("q" + q + "-a" + r);
    var option = alt.innerText;
    console.log(option);
    if (option === ans[q - 1]) {// compare the chosen alt. to the correct answer.
        countRights++;
        result="Right!";
        document.getElementById("feedback").innerHTML = result;
        console.log("rights: " + countRights);
        console.log("wrongs: " + countWrongs);
    }
    else {
        countWrongs++;
        result="Wrong!";
        document.getElementById("feedback").innerHTML = result;
        sec=sec-15;// when wront get the time minus 15 seconds
        console.log("rights: " + countRights);
        console.log("wrongs: " + countWrongs);
    }
    
    if(q < 5 && q >= 1) {
        showQuestion(q + 1);
    } 
    else {
        document.getElementById("q" + (q)).style.display = "none";
         document.getElementById("finalScore").innerHTML = "Your final score is: "+ countRights;
        document.getElementById("submit").style.display = "block";
    }
}

function setInitials(){// it gets the input from the initials stored in the local storage and added to the array of element containing the score and the initials as properties, sorted by highes score.
    var existingEntries = JSON.parse(localStorage.getItem("entries"));
    if(existingEntries === null) existingEntries = [];
    
    var initials = document.getElementById("nameInitials").value;
    var entry = {
        "Initials": initials,
        "Score": countRights}
    existingEntries.push(entry);
    existingEntries.sort(function(a, b) { 
        return b["Score"] -a["Score"]; 
    });
    localStorage.setItem("entries", JSON.stringify(existingEntries));
    window.location.href="highScores.html";
    }

function setHighScores(){// the scores to local storage
     var existingEntries = JSON.parse(localStorage.getItem("entries"));
    if(existingEntries === null) existingEntries = [];
    
            for(i=0;i<existingEntries.length;i++){

            const partInitials= document.createElement("p");//creates element p
            partInitials.setAttribute("id", "inits"+ i);// assigns id="inits0" to p element 
            var  partInitialsElement= existingEntries[i];
            const alternatives = document.createTextNode(partInitialsElement["Initials"] + " " + partInitialsElement["Score"]);
            partInitials.appendChild(alternatives);
            const element1 = document.getElementById("initialNameSet");
            element1.appendChild(partInitials);
     }
}

function clearHighScores() {// clear the scores stored.
    localStorage.setItem("entries", JSON.stringify([]));
    document.getElementById("initialNameSet").innerHTML = "";
}
