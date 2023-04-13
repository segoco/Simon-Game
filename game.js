// Variables
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
// 1. Start Game
$(document).keypress(() => {
  if (gamePattern.length === 0) {
    updateLevel();
    nextSequence();
  }
});
$(".btn").click((event) => {
  if (level > 0) {
    const userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer();
  }
});
// 2. Next Sequence
function nextSequence() {
  level++;
  updateLevel();
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}
// 3. Animate Press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
// 4. Play Sound
function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// 5. Check Answer
function checkAnswer() {
  if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    gameOver();
  }
}
// 6. Game Over
function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}
// 7. Start Over
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
// 8. Update Level
function updateLevel() {
  $("#level-title").text("Level " + level);
}
