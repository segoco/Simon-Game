// Variables
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
// Change title on mobile
if (screen.width < 600) {
  $("#level-title").text("Tap Anywhere to Start");
}
// 1. Start game on desktop
$(document).keypress(() => {
  startGame();
});
// 1.1 tart game on mobile
$(document).on("touchstart", () => {
  startGame();
});
// 1.2. Button Click
$(".pushBtn").click((event) => {
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
  if (screen.width < 600) {
    $("#level-title").text("Game Over, Tap Anywhere to Start");
  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart");
  }
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
// 9. Start Game
function startGame() {
  if (gamePattern.length === 0) {
    updateLevel();
    nextSequence();
  }
}
