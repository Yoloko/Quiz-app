// domine object model making my html interactive 
var time = questionlist.length *15;

var timerEl = document.getElementById('timer');
var questionEL2 = document.getElementById('questions');
var optionEL3 = document.getElementById('option-list');
var questionResultsEl3 = document.getElementById("question-results");
var timerId;
var choices= document.getElementById("choices");
var submitBtn=document.getElementById('submit');
var MultipleChoicesEl=document.getElementById('Multiplechoice');
var feedBackEl =document.getElementById("feedback");
var startBtn = document.getElementById("start");
// var for my question list gave it a value of 0
var currentQuestionIndex = 0;
// object! anytime you use  a sound effect create an object first and store the folder link of the sound in the var 
var sfxwrong = new Audio("../ast/sfx/wrongsound.mp3"); 
var sfxcorrect = new Audio("../ast/sfx/correctsound.mp3");
var initialEl = document.getElementById('initial');

// function to display the timer
function clockTick(){
    time--;
    timerEl.textContent = time;
    if(time <=0){ quizend();
    }

}
// function to display the question and start the timer
function startquiz(){
    startquizEl = document.getElementById("startscreen");

    startBtn.setAttribute ("class","hide");
    questionEL2.removeAttribute("class");
    timerId = setInterval(clockTick, 1000);
    timerId.textContent = time;
    getQuestion();

}
// function to get my  question list 
function getQuestion(){
    // question list is the set of question you created and you are calling it so it can appear under question title from your html
    var quizQuestion = questionlist[currentQuestionIndex].questionTitle;

    var titleEl = document.getElementById('questionTitle')

    titleEl.textContent = quizQuestion;
//    ERASE THE PREVIOUS QUESTIONS AND ANSWER 
    MultipleChoicesEl.innerHTML = "";
//choices is from my HTML ,  this is a for loop to go to each questions   "current question index is the question number andit will loop throught the mulitple choice question that are define on the question list with the count of i i will start at 0 and will end when they are no more muliple choice question 
//   Pass an argument to loop through the question list choise is the name of my function 
    questionlist[currentQuestionIndex].multiplechoice.forEach (function(choice, index){

       var choiceNode = document.createElement("button");
    //    html id 
       choiceNode.setAttribute("class", "choice");
    //    this c
       choiceNode.setAttribute("value", choice);
       choiceNode.textContent= index+1+ ". "+ choice;
    //    creating a function for the eventlistener
    
       choiceNode.onclick = questionClick
    //   to  display  the eventlistener on  the page use appendchild
    MultipleChoicesEl.appendChild(choiceNode);
    
    });
   
// calling a function will run the function 
   

}
function questionClick(){

    if (this.value!== questionlist[currentQuestionIndex].answer){
    // reducing  the time if the user get the question wrong the actual time minus 15
        time -= 15;
        if(time <0){
            time = 0

        }
        timeEl.textcontent=time
        // function in js
        sfxwrong.play ();
        feedBackEl.textContent="wrong answer"

    }else{
        sfxcorrect.play ();
        feedBackEl.textContent="correctAnswer"
    }
    feedBackEl.setAttribute("class","feedBack");
    setTimeout(function(){
        feedBackEl.setAttribute("class","feedback hide");
    },1000);
    currentQuestionIndex++
    if (currentQuestionIndex===questionList.length){
        quizEnd()
    
    }else{
        getQuestion()
    }

}

function quizEnd(){
    clearInterval(timerid)
    var endScreenEl = document.getElementById("endscreen");
    endScreenEl.removeAttribute('class');
    var finalScoreEl= document.getElementById('final-score');
    finalScoreEl.textcontent =time
    questionEl.setAttribute('class',"hide");
}

function SaveHighScore(){

    var initial = initialEl.value.trim()
    if(initial !== "" ){
        var highscore = JSON.parse(window.localStorage.getItem("highscore")) || [];
    
    // Format new score obj 
    var newscore ={
        score:time,
        initials: initials
    };
    // save to local storage
    highscore.push(newscore);
    window.localStorage.setItem("highscore", JSON.stringify(highscore));

    //Redirect to next page
    window.location.href= "highscores.html";
    }
}

function checkForEnter(event){
    if(event.key === "Enter"){
        SaveHighScore;
    }
}

submit.onclick = SaveHighScore;
startBtn.onclick = startquiz;
initialEl.onclick = checkForEnter;


