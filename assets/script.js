//query selectors

var quiz = document.querySelector(".quiz");
var questionsElement = document.querySelector(".askQuestions");
var choice1 = document.querySelector(".option1");
var choice2 = document.querySelector(".option2");
var choice3 = document.querySelector(".option3");
var choice4 = document.querySelector(".option4");
var right = document.querySelector(".right");
var wrong = document.querySelector(".wrong");
var initialSection = document.querySelector(".initial-section");
var finalScore = document.querySelector(".final-score");
var submit = document.querySelector(".submit-button");
var timerElement = document.querySelector("#timer");
var coding = document.querySelector("#coding");
var viewHighscores = document.querySelector("a");
var scoreSheet = document.querySelector("#scoreSheet");

var timerCount = 60;
var timerInterval = 0;
//startQuiz function is called when start button is clicked
var startQuiz = document.querySelector(".start-quiz");
startQuiz.addEventListener("click", startTimer);

startQuiz.addEventListener("click", function () {
    document.querySelector(".coding").style.display = "none";
    quiz.style.display = "block";
    })

function startTimer(){
        timerInterval = setInterval(function () {
        timerCount--;
        timerElement.textContent = "Time: " + timerCount;

        if (timerCount === 0) {
            clearInterval(timerInterval);
            finished();
        }
    }, 1000);

    coding.innerHTML = "";

    quiz.setAttribute("style", "display:block");
    content();
    };

//Questions for the quiz
var question1 = "Which primitive type states true or false values?"
var question2 = "Which allows us to go through an entire array, regardless of how many items are in it, and run code on each item in the array?"
var question3 = "A single variable that is used to hold a group of data is called what?"
var question4 = "What is a set of instructions that tells the computer how to perform a task and must be called in order to be executed?"
var question5 = "What must be included in order to be considered a string?"
var theQuestions = [question1, question2, question3, question4, question5]

//answer option for the test
var test1 = {
        option1: "A  String",
        option2: "B  Number",
        option3: "C  Undefined",
        option4: "D  Boolean", //correct answer
    }

var test2 = {
        option1: "A  For Loop", //correct answer
        option2: "B  Function",
        option3: "C  Return",
        option4: "D  Expression",
    }

var test3 = {
        option1: "A  Conditionals",
        option2: "B  Declaration",
        option3: "C  Array", //correct answer
        option4: "D  Push",
    }

var test4 = {
        option1: "A  Variable",
        option2: "B  Function", //correct answer
        option3: "C  Logical Operators",
        option4: "D  None of the above",
    }

var test5 = {
        option1: "A  Quotation Marks", //correct answer
        option2: "B  Brackets",
        option3: "C  Parentheses",
        option4: "D  None of the above",
    }
//variable arrays that contain answers
var answers = [test1, test2, test3, test4, test5]

//correct answers
var correct1 = test1.option4;
var correct2 = test2.option1;
var correct3 = test3.option3;
var correct4 = test4.option2;
var correct5 = test5.option1;
var correctAnswers = [correct1, correct2, correct3, correct4, correct5]

var questionIndex = 0;
var boxElement = document.querySelector(".quiz");
boxElement.addEventListener("click", content);
function content() {
    questionsElement.textContent = theQuestions[questionIndex];
    choice1.textContent = answers[questionIndex].option1;
    choice2.textContent = answers[questionIndex].option2;
    choice3.textContent = answers[questionIndex].option3;
    choice4.textContent = answers[questionIndex].option4;
};

choice1.addEventListener("click", select1);
function select1() {
    wrong.setAttribute("style", "display:block");
    right.setAttribute("style", "display:none");
    if (timerCount >= 10) {
        timerCount -= 10;
    } else {
        clearInterval(timerInterval);
        finished();
    }
    questionIndex++;
    if (questionIndex >= answers.length) {
        clearInterval(timerInterval);
        finished();
    }
    if (timerCount === 0) {
        clearInterval(timerInterval);
        finished();
    }
};

choice2.addEventListener("click", select2);
function select2() {
    wrong.setAttribute("style", "display:block");
    right.setAttribute("style", "display:none");
    if (timerCount >= 10) {
        timerCount -= 10;
    } else {
        clearInterval(timerInterval);
        finished();
    }
    questionIndex++;
    if (questionIndex >= answers.length) {
        clearInterval(timerInterval);
        finished();
    }
    if (timerCount === 0) {
        clearInterval(timerInterval);
        finished();
    }
};

choice3.addEventListener("click", select3);
function select3() {
    wrong.setAttribute("style", "display:block");
    right.setAttribute("style", "display:none");
    if (timerCount >= 10) {
        timerCount -= 10;
    } else {
        clearInterval(timerInterval);
        finished();
    }
    questionIndex++;
    if (questionIndex >= answers.length) {
        clearInterval(timerInterval);
        finished();
    }
    if (timerCount === 0) {
        clearInterval(timerInterval);
        finished();
    }
};

choice4.addEventListener("click", select4);
function select4() {
    wrong.setAttribute("style", "display:block");
    right.setAttribute("style", "display:none");
    if (timerCount >= 10) {
        timerCount -= 10;
    } else {
        clearInterval(timerInterval);
        finished();
    }
    questionIndex++;
    if (questionIndex >= answers.length) {
        clearInterval(timerInterval);
        finished();
    }
    if (timerCount === 0) {
        clearInterval(timerInterval);
        finished();
    }
};
//quiz is finished when all questions are answered
function finished() {
    quiz.setAttribute("style", "display:none");
    timerElement.textContent = "Time: " + timerCount;
    finalScore.textContent = "Your final score is " + timerCount;
    initialSection.setAttribute("style", "display:block");
};

var options = document.querySelector("#options");
var givenInitials = document.querySelector("input");
options.addEventListener("mouseover", hideFeedback);
givenInitials.addEventListener("click", hideFeedback);
function hideFeedback() {
    right.setAttribute("style", "display:none");
    wrong.setAttribute("style", "display:none");
};

var scoreArray = [];
function setTime() {
    localStorage.setItem("local-scoreArray", JSON.stringify(scoreArray));
};

submit.addEventListener("click", scoreLog);
function scoreLog() {
    initialSection.setAttribute("style", "display:none");
    timerElement.setAttribute("style", "display:none");
    viewHighscores.setAttribute("style", "display:none");
    right.setAttribute("style", "display:none");
    wrong.setAttribute("style", "display:none");
    scoreSheet.setAttribute("style", "display:block");

    var user = {
        name: givenInitials.value,
        timeDone: timerCount
    };

    scoreArray.push(user)

    highscores();
};

function receiveScores() {
    var storedHighscores = localStorage.getItem("local-scoreArray");

    if (storedHighscores !== null) {
        scoreArray = storedHighscores;
    } else {
        return;
    }
};

var score = document.querySelector("#scoredata");
function highscores() {
    for (var i = 0; i < scoreArray.length; i++) {
        var score = scoreArray[i];

        var li = document.createElement("li");
        li.textContent = score.name + " - " + score.timeDone;
    }
};

receiveScores();

//event listener for go back button
var goBack = document.querySelector(".reset");
goBack.addEventListener("click", function() {
    location.reload()
});

//event listener for clear highscores button
var clearHighscores = document.querySelector(".clear");
clearHighscores.addEventListener("click", function() {
    score.innerHTML = "";
    localStorage.clear();
});

//highscores page
viewHighscores.addEventListener("click", function() {
    timerElement.setAttribute("style", "display:none");
    coding.setAttribute("style", "display:none");
    right.setAttribute("style", "display:none");
    wrong.setAttribute("style", "display:none");
    quiz.setAttribute("style", "display:none");
    viewHighscores.setAttribute("style", "display:none");
    scoreSheet.setAttribute("style", "display:block");
    initialSection.setAttribute("style", "display:none");
    receiveScores();
    highscores();
})