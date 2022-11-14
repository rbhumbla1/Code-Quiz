var wrapper = document.querySelector(".wrapper");
var startBtn = null;
var initCard = document.querySelector("#init-card");
var timer = document.querySelector("#timerDisp");
var result = document.querySelector("#result");
var initials = null;
var timeLeft = 75;
//var numQues = 6;
var numQues = 1;
var score = 0;
var scoreList = [];



console.log(initCard);
console.log(startBtn);

function startTimer() {
    // Sets interval in variable
    var timerInterval = setInterval(function () {


        if (timeLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            saveResults();
        } else {
            timeLeft--;
            timer.textContent = "Timer: " + timeLeft;
            initCard.setAttribute("class", "textProps justifyLeft");
            startQuiz();
        }

    }, 1000);

}

//Function to start the quiz
function startQuiz() {
    initCard.innerHTML = "What all is included in a web page?<br><button class=\"btn\" id =\"btn1\">1. HTML</button><br><button class=\"btn\" id =\"btn2\">2. CSS</button><br><button class= \"btn\" id =\"btn3\">3. JS</button><br><button class=\"btn\" id =\"btn4\">4. All of the above."
}

//Function to calculate if the user selected correct response
function getResults() {
    var ans = false;
    numQues--;
    return ans;
}

// Function to save results in local storage using players initial
function saveResults() {
    console.log("timer or question done");
    timer.textContent = "Timer: Done";

    //get user initials
    initCard.innerHTML = "<b>All Done!</b><br>Your final score is " + score + ".<br>Enter Initials: <input id = \"initials\" type=\"text\"> <button id=\"Submit\" class=\"btn\">Submit</button>"
    initials = document.querySelector("#initials");
}

function getScoreListString(){
    var storedList = JSON.parse(localStorage.getItem("scoreList"));
    var values = "";

    for(var i = 0; i < storedList.length; i++){
        console.log("sow res = " + storedList[i].initials + " - " + storedList[i].score );
        values += i+1 + ". " + storedList[i].initials + " - " + storedList[i].score + "<br>";
    }

    console.log("values = " + values);
    return values;
}

//Function to show results list
function showResults(){
    // Use JSON.parse() to convert text to JavaScript object
  var values = getScoreListString();

  initCard.innerHTML = "<b>High Scores:</b><br>"+ values + " <button id=\"goBack\" class=\"btn\">Go Back</button><button id=\"clearScores\" class=\"btn\">Clear High Scores</button>";
}

wrapper.addEventListener("click", function (event) {
    var element = event.target;
    var answer = false;
    console.log(element);
    event.preventDefault();


    if (element.matches("a")) {
        console.log("view high score clicked");
        var values = getScoreListString();
        var newValues = values.replace(/<br>/g, "\n");
        alert(newValues);
    } else if (element.matches("button") && element.innerHTML === "Start") {
        console.log("Start button.." + element.innerHTML);
        startTimer();
    } else if (element.matches("button") && element.innerHTML === "Submit") {
        console.log("Submit clicked");
        //object to store scores in local storage
        console.log("score = " + score + "initial = " + initials.textContent + " or init = " + initials.value.trim());
        var userScore = {
            initials: initials.value.trim(),
            score: score
        };

        scoreList[scoreList.length] = userScore;

        // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
        localStorage.setItem("scoreList", JSON.stringify(scoreList));

        showResults();

    } else if(element.matches("button") && element.innerHTML === "Go Back"){
        timeLeft = 75;
        timer.textContent = "Timer: " + timeLeft;
        initCard.setAttribute("class", "textProps");
        result.textContent = "";
        numQues = 1;
        score = 0;
        init();

    } else if (element.matches("button") && element.innerHTML === "Clear high Scores"){
        
    }else if (element.matches("button") && element.innerHTML !== "Start") {
        console.log("button.." + element.innerHTML);
        answer = getResults();
        if (answer === true) {
            result.textContent = "Correct!";
            if (numQues === 0) {
                //save timer as score before setting it to 0
                score = timeLeft;
                timeLeft = 0;
                console.log("numQues = " + numQues)
            }
        } else {
            result.textContent = "Wrong!";
            timeLeft -= 10;
            score = timeLeft;
            if (score < 0)
                score = 0;
            console.log("wrong..." + timeLeft + "..." + numQues)
            if (timeLeft < 0 || numQues === 0) {
                timeLeft = 0;
                console.log("settng timer 0");
            }
        }
    } else {
        console.log("something else clicked");
    }
})



function init() {
    initCard.innerHTML = "Click Start button to start the timed quiz. Remember a wrong answer will detect time from the timer.<br><button id=\"start\" class\=\"btn\">Start</button>";
    startBtn = document.querySelector("#start");
    console.log(startBtn);

    //get stored scored
    var storedList = JSON.parse(localStorage.getItem("scoreList"));
  // TODO: Describe the functionality of the following `if` statement.
  if (storedList !== null) {
    scoreList = storedList;
  }
}

init();

