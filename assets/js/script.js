//Creatign a wrapper element to process all clicks on the page.
var wrapper = document.querySelector(".wrapper");
//start Button
var startBtn = null;
// variable for putting initial message with Start button and then the multiple choice questions dynamically
var initCard = document.querySelector("#init-card");
//Timer display
var timer = document.querySelector("#timerDisp");
//variable to to display result of each question as correct or wrong
var result = document.querySelector("#result");
//variable to store user entered initials
var initials = null;
//Variable to keep track of timer.  Each round get 75 seconds
var timeLeft = 75;
//Variable to keep track of number of questions
var numQues = 0;
//Variable to keep track of the score
var score = 0;
//Array to store (initials, score) pair in Local storage
var scoreList = [];

//array to store all the questions, theirs choices of answers and correct answer
var questionList = [
    {ques:"Commonly used data types do NOT include: ", btn1:"1. strings", btn2:"2. boolean", btn3:"3. alerts", btn4:"4. numbers", ans:"3. alerts"},
    {ques:"The condition in an if / else statement is enclosed with ________.", btn1:"1. quotes", btn2:"2. curly brackets", btn3:"3. parantheses", btn4:"4. square brackets", ans:"3. parantheses"},
    {ques:"Arrays in JavaScript can be used to store _________. ", btn1:"1. number and strings", btn2:"2. other arrays", btn3:"3. booleans", btn4:"4. all of the above", ans:"4. all of the above"},
    {ques:"String values must be enclosed within _________ when being assigned to variables.", btn1:"1. commas", btn2:"2. curly brackets", btn3:"3. quotes", btn4:"4. parantheses", ans:"3. quotes"},
    {ques:"A very useful tool used during development and debugging for printing content is: ", btn1:"1. Javascript", btn2:"2. terminal/bash", btn3:"3. for loops", btn4:"4. console.log", ans:"4. console.log"}
]

//Timer function  - it is executed when Start button is pressed
function startTimer() {
    var timerInterval = setInterval(function () {

        if (timeLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to save the score and intials in gloval variables
            saveResults();
        } else {
            //Start timer if timeLeft is not 0 and run the quiz
            timeLeft--;
            timer.textContent = "Timer: " + timeLeft;
            initCard.setAttribute("class", "textProps justifyLeft");
            runQuiz();
        }

    }, 1000);

}

//Function to run the quiz
function runQuiz() {
    //pick the question to be displayed from the array of questions
    var question =questionList[numQues];
    
    //Display the question in initCard paragraph
    initCard.innerHTML = question.ques +"<br><button class=\"btn\" id =\"btn1\">" +question.btn1+ "</button><br><button class=\"btn\" id =\"btn2\">" +question.btn2+ "</button><br><button class= \"btn\" id =\"btn3\">" +question.btn3+ "</button><br><button class=\"btn\" id =\"btn4\">" +question.btn4;
}


// Function to save users score and initial - this is called when Timer is done or all the questions are done and timer is set to zero.
function saveResults() {
    
    timer.textContent = "Timer: Done";

    //First display the final score and create the input on the page where the user can enter their initials
    initCard.innerHTML = "<b>All Done!</b><br>Your final score is " + score + ".<br>Enter Initials: <input id = \"initials\" type=\"text\"> <button id=\"Submit\" class=\"btn\">Submit</button>"
    //get user initials
    initials = document.querySelector("#initials");
}

//Get the list of Initials and score from Local Storage to display high scores from previous runs
//if link = true, we need to create a display string for alert popup when View High Score lin is clicked
//If link = false, we need to createa string to display high score on the card in the apge.
function getScoreListString(link) {
    //get stored initial/score pair from local storage
    var storedList = JSON.parse(localStorage.getItem("scoreList"));
    var values = "";

    for (var i = 0; i < storedList.length; i++) {
        var y = i+1;
        if(!link)
         values += "<span>" + y + ". " + storedList[i].initials + " - " + storedList[i].score + "</span><br>";
        else
        values +=  y + ". " + storedList[i].initials + " - " + storedList[i].score + "<br>";

    }

    return values;
}

//Function to calculate if the user selected correct response
function getResults(btnValue) {
   
    var ans = false;
    var question = questionList[numQues];
    //checks the text of button clicked in multiple choice to the stores correct answer for that question in questions array
    if(question.ans === btnValue)
     ans = true;
    else
     ans = false;

    //increment numQues to go to next question
    numQues++;

    return ans;
}

//Function to show results list in the card on the page
function showResults() {

    var values = getScoreListString(false);

    initCard.innerHTML = "<b>High Scores:</b><br>" + values + "<br> <button id=\"goBack\" class=\"btn\">Go Back</button><button id=\"clearScores\" class=\"btn\">Clear High Scores</button>";
}

//main Event listener for warpper element - it will parse all the clicks for links and various buttons on the page
wrapper.addEventListener("click", function (event) {
    var element = event.target;
    var answer = false;
    console.log(element);
    event.preventDefault();

    if (element.innerHTML === "View High Scores") {  //View High Scores
        console.log("View high score clicked");

        var values = getScoreListString(true);
        var newValues = values.replace(/<br>/g, "\n");
        alert(newValues);

    } else if (element.innerHTML === "Start") { //Start Button
        console.log("Start button clicked");

        //start the timer when start button is clicked
        startTimer();

    } else if (element.innerHTML === "Submit") { //Submit Button

        console.log("Submit clicked");

        //userScore object to store scores in local storage
        var userScore = {
            initials: initials.value.trim(),
            score: score
        };

        //add the latest userScore to the ScoreList
        scoreList[scoreList.length] = userScore;

        //weite scoreList to local storage
        localStorage.setItem("scoreList", JSON.stringify(scoreList));

        //show all the scores stored in local storage so far
        showResults();

    } else if (element.innerHTML === "Go Back") { //Go back

        console.log("Go Back clicked");

        //This will go back to the beginning and sets all the variables to their initial value before reloading the page
        timeLeft = 75;
        timer.textContent = "Timer: " + timeLeft;
        initCard.setAttribute("class", "textProps");
        result.textContent = "";
        numQues = 0;
        score = 0;

       // For some reason calling init(); if not working properly all the time so using reload function to get to correct page
       location.reload();

    } else if (element.innerHTML === "Clear high Scores") {  //Clear High Score Button
 
        console.log("Clear High Score clicked");

       //empty out the scoreList
        scoreList.splice(0, scoreList.length);
        //store in local storage
        localStorage.setItem("scoreList", JSON.stringify(scoreList));
        //clear out the display on page
        initCard.innerHTML = "<b>High Scores:</b><br><span></span>\n <button id=\"goBack\" class=\"btn\">Go Back</button><button id=\"clearScores\" class=\"btn\">Clear High Scores</button>";

    } else if (element.innerHTML !== "Start") {       //Any of the Answer Button 

        console.log("One of the answer button clicked");

        //Return if all questions are done
        if(numQues === 5)
            return;
        
        //check if answer is correct or wrong
        answer = getResults(element.innerHTML);

        //answer is correct
        if (answer === true) {
            result.textContent = "Correct!";
            //If last question, stoptimer and save score
            if (numQues === 5) {
                //save timer as score before setting it to 0
                score = timeLeft;
                timeLeft = 0;
                console.log("numQues = " + numQues)
            } else{       //if more question, keep running the quiz 
                runQuiz();
            }
        } else { //answer is wrong
            result.textContent = "Wrong!";

            //deduct 10s from timer for wrong answer
            timeLeft -= 10;
            //save timeLeft as score
            score = timeLeft;

            //set score to zero if negative value
            if (score < 0)
                score = 0;
            
            //If time is negative or all questions donw, then set timer to 0 to stop the quiz
            if (timeLeft < 0 || numQues === 5) {
                timeLeft = 0;
            } else{
                runQuiz();  //otherwise keep running the quiz
            }
        }

    } else {
        console.log("Ignore redundant clicks.");
    }
})


//Main fucntion
//It setups up the start message
//Also initialize the scoreList for the session with any initial/scores pairs stored in local storage from previous sessions
function init() {
    initCard.innerHTML = "Click Start button to start the timed quiz. Remember a wrong answer will detect time from the timer.<br><button id=\"start\" class\=\"btn\">Start</button>";
    startBtn = document.querySelector("#start");

    //get stored scores
    var storedList = JSON.parse(localStorage.getItem("scoreList"));
    if (storedList !== null) {
        scoreList = storedList;
    }
}

//Call init
init();

