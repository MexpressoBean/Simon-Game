// Array that hold the colors of the buttons
var buttonColours = ["red", "blue", "green", "yellow"];

// Empty array that will hold the game pattern
var gamePattern = [];

// User click pattern
var userClickedPattern = [];

// Variable that keeps track of game level
var level = 0;

// Variable that keeps track of if the game has started or not
var started = false;



// Detect keypress to start the game
$(document).keydown(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



// This is an event handler for a user click on a button (any item that has the .btn class)
$(".btn").click(function() {
  // Variable that stores the id(color name) of the button that the user clicked on
  var userChosenColour = $(this).attr("id");

  // Plays a sound based on the button chosen
  playSound(userChosenColour);

  // Animates button press
  animatePress(userChosenColour);

  // Adds the button name to the end of the array of buttons chosen by the user
  userClickedPattern.push(userChosenColour);

  // Logs the user button choices
  console.log(userClickedPattern);

  checkAnswer(userClickedPattern.length - 1);
});





// Plays the sound of a button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}



function nextSequence() {
  // reset the gamePattern array once nextSequence() is called
  userClickedPattern = [];

  // increment the level number
  level++;

  // Updates the h1 for the level number
  $("#level-title").text("Level " + level);

  // Stores random number between 0 - 3 into randomNumber
  var randomNumber = Math.floor(Math.random() * 4);

  // Stores string of colour from the button colours array
  var randomChosenColour = buttonColours[randomNumber];

  // Adds a button to the gamePattern Array
  gamePattern.push(randomChosenColour);

  // This animation makes the button look like its been pushed in and then out
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Plays the sound of the button clicked
  playSound(randomChosenColour);
}



function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    // What happends if the user gets the sequence wrong?
    var failSound = new Audio("sounds/wrong.mp3");
    failSound.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    // Starts the game over
    startOver();
  }
}

// Resets the values that will get the game to restart
function startOver()
{
  level = 0;
  started = false;
  gamePattern = [];
}
