//query selectors
var startButton = document.querySelector(".start-button");
var quiz = document.querySelector(".quiz");
var questions = document.querySelector(".questions");
var option1 = document.querySelector(".option1");
var option2 = document.querySelector(".option2");
var option3 = document.querySelector(".option3");
var option4 = document.querySelector(".option4");
var result = document.querySelector("#right-wrong");
var initials = document.querySelector(".initials");
var submitButton = document.querySelector(".submit-button");
var score = document.querySelector(".score");
var highscores = document.querySelector(".highscores");
var timerElement = document.querySelector(".timer-count");

//Questions for the quiz
var question1 = "Which primitive type states true or false values?"; //boolean
var question2 = "Which allows us to go through an entire array, regardless of how many items are in it, and run code on each item in the array?"; //for loop
var question3 = "A single variable that is used to hold a group of data is called what?"; //an array
var question4 = "What is a set of instructions that tells the computer how to perform a task and must be called in order to be executed?"; //a function
var question5 = "What must be included in order to be considered a string?"; //quotation marks
var theQuestions = [question1, question2, question3, question4, question5]

//Number of choices for each question
var answer1 = {
    choiceA: "A-- String",
    choiceB: "B-- Number",
    choiceC: "C-- Undefined",
    choiceD: "D-- Boolean" //correct answer
}

var answer2 = {
    choiceA: "A-- For Loop", //correct answer
    choiceB: "B-- Function",
    choiceC: "C-- Return",
    choiceD: "D-- Expression"
}

var answer3 = {
    choiceA: "A-- Conditionals",
    choiceB: "B-- Declaration",
    choiceC: "C-- Array", //correct answer
    choiceD: "D-- Push"
}

var answer4 = {
    choiceA: "A-- Variable",
    choiceB: "B-- Function", //correct answer
    choiceC: "C-- Logical Operators",
    choiceD: "D-- None of the above"
}

var answer5 = {
    choiceA: "A-- Quotation Marks", //correct answer
    choiceB: "B-- Brackets",
    choiceC: "C-- Parentheses",
    choiceD: "D-- None of the above"
}
var answers = [answer1, answer2, answer3, answer4, answer5]

//Correct answers for each question
var correct1 = answer1.choiceD;
var correct2 = answer2.choiceA;
var correct3 = answer3.choiceC;
var correct4 = answer4.choiceB;
var correct5 = answer5.choiceA;
var correctAnswers = [correct1, correct2, correct3, correct4, correct5]

startButton.addEventListener("click", startTimer)

startButton.addEventListener("click", function(){
    document.querySelector(".coding").style.display = "none";
    quiz.style.display = "block";
// prevents start button from being clicked when round is in progress    
    startButton.disabled = true;
    renderBlanks()
    startTimer()    
})

startButton.addEventListener("click", nextQuestion);
var correctIndex = 0;

function nextQuestion() {
    if (correctIndex === theQuestions.length - 1) {
        setTimeout(function(){quiz.style.display = "none";
        initials.style.display = "inline";
    }, 500);

    // stop timer
    setTimeout(function(){clearInterval(timer)}, 500);

    } else {
        questions.textContent = theQuestions[correctIndex];
        option1.textContent = answers[correctIndex].choiceA;
        option2.textContent = answers[correctIndex].choiceB;
        option3.textContent = answers[correctIndex].choiceC;
        option4.textContent = answers[correctIndex].choiceD;
    }
}
//countdown from 60 seconds
var timerCount = 60;
var timer;
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = "Time: " + timerCount;

//if time ever run out, directed to initials page 
        if (timerCount === 0) {
            clearInterval(timer);
            quiz.style.display = "none";
            initials.style.display = "inline";
        }
    }, 1000);
    return timer;
}
startTimer();

//to verify the correct answer
quiz.addEventListener("click", verify)

function verify(event) {
    if(event.target.matches(".trigger")){
        var userChoice = event.target.textContent;

        //if start button is clicked again, page will be refreshed to start over test
        result.textContent = " ";
        result.style.display = "block";
            if (userChoice === correctAnswers[correctIndex]) {
                result.textContent = "Right!";
                setTimeout(function(){result.style.display = "none"}, 500);
            } else {
                result.textContent = "Wrong!";
                setTimeout(function(){result.style.display = "none"}, 500);
                timerCount -= 5;
                timerElement.textContent = "Time: " + timerCount;
            }
            correctIndex++;
    }
    return timerCount;
}

//next question
quiz.addEventListener("click", function(event){
    if(event.target.matches(".trigger")){
        nextQuestion();
    }
})

//submit button
submitButton.addEventListener("click", function(event){
    event.preventDefault();
})
//local storage
function user() {
    var userInitials = document.querySelector("#initials").value;
    localStorage.setItem(userInitials, timerCount);
    document.querySelector(".score").textContent = " ";
    var p = document.createElement("p");
    p.textContent = userInitials + ":" + timerCount;
    document.querySelector(".score").appendChild(p);
}
user();
// start quiz again when go back button is clicked
document.querySelector(".go-back").addEventListener("click", function() {
    correctIndex = 0;
    timerCount = 60;
    timerElement.textContent = "Time: 60 seconds";
})

document.querySelector(".clear-highscores").addEventListener("click", function() {
    localStorage.clear();
    document.querySelector(".score").textContent = " ";
});

viewHighscores.addEventListener("click", function(){
    clearInterval(timerInterval);
    document.querySelector(".coding").style.display = "none";
    quiz.style.display = "none";
    initials.style.display = "none";
    score.style.display = "block";
    
    document.querySelector(".score").textContent = " ";
    for (let i = 0; i < localStorage.length; i++) {
        var p = document.createElement("p");
        var user = localStorage.key(i);
        var scores = localStorage.getItem(localStorage.key(i));
        p.textContent = user + ": " + scores;
        document.querySelector(".score").appendChild(p);
    }
})