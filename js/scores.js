function printHighScore(){
    // json.parse is an object
    var highScores =JSON.parse(window.localStorage.getItem("highscores")) ||  [];
    highScores.store(function(a,b){
        return b.score - a.score;
    });
    // foreach loop is always used for a list of items 
    highScores.forEach(function(score){
        var listTag = document.createElement("li")
        // 
        listTag.textContent = score.initals + " - " + score.score;

        var olEl = document.getElementById('highscores');
        olEl.appendChild(listTag)

    });
}


function clearHighScores(){
    window.localStorage.romoveItem("highscores");
    window.location.reload();
}
document.getElementById("clear").onclick = clearHighScores

printHighScore();