
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
userClickedPattern = [];
var started = false;
var level = 0 ;
var currentLevel = 0;

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});



$(".btn").click(function(event){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(currentLevel){
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {


    if (gamePattern.length === userClickedPattern.length){
    setTimeout(function(){
    nextSequence();}, 1000);
}
     
   } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
   }

   
};


function nextSequence (){
    userClickedPattern = [];
    level++ ;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).animate({opacity: '0.2'}, "fast" );
    $("#"+randomChosenColour).animate({opacity: '1'}, "fast");
    playSound(randomChosenColour);
  
}


    function playSound(name) {

    var sounds = new Audio("sounds/" + name + ".mp3");
    sounds.play();

};

    function animatePress(currentColour){
    
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
    }, 100);
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false ;
}
