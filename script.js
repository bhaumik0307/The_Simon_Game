var buttonColor = new Array("green", "red", "yellow", "blue");

var gamePattern = new Array();
var userPattern = [];

var level = 0;
var started = false;


$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});
$(".btn").click(function(){
    var color=$(this).attr("id");
    userPattern.push(color);

    playSound(color);
    animate(color);
    checkAnswer(userPattern.length-1);
})
function checkAnswer(currentLevel){
    if(userPattern[currentLevel] === gamePattern[currentLevel]){
        if(userPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function nextSequence() {
    userPattern=[];
    level++;
    $("h1").html("Level "+level);

    var num = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColor[num];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    
}
function playSound(color){
    var audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}
function startOver(){
    started=false;
    gamePattern=[];
    level=0;
}
function animate(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}