var wrapper = document.querySelector(".wrapper");
var startBtn = null;
var initCard = document.querySelector("#init-card");
var timer = document.querySelector("#timerDisp");
var result = document.querySelector("#result");
var initials = null;
var timeLeft = 75;
var numQues = 0;
var score = 0;
var scoreList = [];

// var question = {
//     ques:"",
//     btn1:"",
//     btn2:"",
//     btn3:"",
//     btn4:"",
//     answer:""
// };

var questionList = [
    {ques:"Commonly used data types do NOT include: ", btn1:"1. strings", btn2:"2. boolean", btn3:"3. alerts", btn4:"4. numbers", ans:"3. alerts"},
    {ques:"The condition in an if / else statement is enclosed with ________.", btn1:"1. quotes", btn2:"2. curly brackets", btn3:"3. parantheses", btn4:"4. square brackets", ans:"3. parantheses"},
    {ques:"Arrays in JavaScript can be used to store _________. ", btn1:"1. number and strings", btn2:"2. other arrays", btn3:"3. booleans", btn4:"4. all of the above", ans:"4. all of the above"},
    {ques:"String values must be enclosed within _________ when being assigned to variables.", btn1:"1. commas", btn2:"2. curly brackets", btn3:"3. quotes", btn4:"4. parantheses", ans:"3. quotes"},
    {ques:"A very useful tool used during development and debugging for printing content is: ", btn1:"1. Javascript", btn2:"2. terminal/bash", btn3:"3. for loops", btn4:"4. console.log", ans:"4. console.log"}
]

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
    console.log("startQuiz..." + numQues)
    var question =questionList[numQues];
    //initCard.innerHTML = "What all is included in a web page?<br><button class=\"btn\" id =\"btn1\">1. HTML</button><br><button class=\"btn\" id =\"btn2\">2. CSS</button><br><button class= \"btn\" id =\"btn3\">3. JS</button><br><button class=\"btn\" id =\"btn4\">4. All of the above."
    initCard.innerHTML = question.ques +"<br><button class=\"btn\" id =\"btn1\">" +question.btn1+ "</button><br><button class=\"btn\" id =\"btn2\">" +question.btn2+ "</button><br><button class= \"btn\" id =\"btn3\">" +question.btn3+ "</button><br><button class=\"btn\" id =\"btn4\">" +question.btn4;
}

//Function to calculate if the user selected correct response
function getResults(btnValue) {
    console.log("get result..." + numQues);
    var ans = false;
    var question = questionList[numQues];
    if(question.ans === btnValue)
     ans = true;
    else
     ans = false;

    numQues++;
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

function getScoreListString(link) {
    var storedList = JSON.parse(localStorage.getItem("scoreList"));
    var values = "";

    for (var i = 0; i < storedList.length; i++) {
        console.log("sow res = " + storedList[i].initials + " - " + storedList[i].score);
        var y = i+1;
        if(!link)
         values += "<span>" + y + ". " + storedList[i].initials + " - " + storedList[i].score + "</span><br>";
        else
        values +=  y + ". " + storedList[i].initials + " - " + storedList[i].score + "<br>";

    }

    console.log("values = " + values);
    return values;
}

//Function to show results list
function showResults() {
    var values = getScoreListString(false);

    initCard.innerHTML = "<b>High Scores:</b><br>" + values + "<br> <button id=\"goBack\" class=\"btn\">Go Back</button><button id=\"clearScores\" class=\"btn\">Clear High Scores</button>";
}

wrapper.addEventListener("click", function (event) {
    var element = event.target;
    var answer = false;
    console.log(element);
    event.preventDefault();


    if (element.innerHTML === "View High Scores") {
        console.log("view high score clicked");
        var values = getScoreListString(true);
        var newValues = values.replace(/<br>/g, "\n");
        alert(newValues);

    } else if (element.innerHTML === "Start") {
        console.log("Start button.." + element.innerHTML);
        startTimer();

    } else if (element.innerHTML === "Submit") {
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

    } else if (element.innerHTML === "Go Back") {
        timeLeft = 75;
        timer.textContent = "Timer: " + timeLeft;
        initCard.setAttribute("class", "textProps");
        result.textContent = "";
        numQues = 0;
        score = 0;
       // init();
       location.reload();

    } else if (element.innerHTML === "Clear high Scores") {
        scoreList.length = 0;
        scoreList = [];
        localStorage.setItem("scoreList", JSON.stringify(scoreList));
        initCard.innerHTML = "<b>High Scores:</b><br><span></span>\n <button id=\"goBack\" class=\"btn\">Go Back</button><button id=\"clearScores\" class=\"btn\">Clear High Scores</button>";

    } else if (element.innerHTML !== "Start") {
        console.log("button.." + element.innerHTML);
        if(numQues === 5)
            return;
        answer = getResults(element.innerHTML);
        if (answer === true) {
            result.textContent = "Correct!";
            if (numQues === 5) {
                //save timer as score before setting it to 0
                score = timeLeft;
                timeLeft = 0;
                console.log("numQues = " + numQues)
            } else{
                startQuiz();
            }
        
        } else {
            result.textContent = "Wrong!";
            timeLeft -= 10;
            score = timeLeft;
            if (score < 0)
                score = 0;
            console.log("wrong..." + timeLeft + "..." + numQues)
            if (timeLeft < 0 || numQues === 5) {
                timeLeft = 0;
                console.log("settng timer 0");
            } else{
                startQuiz();
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
    if (storedList !== null) {
        scoreList = storedList;
    }
}

init();

