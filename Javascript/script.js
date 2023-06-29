let splashScreen = document.getElementById("splash");
let gameScreen = document.getElementById("game");
let gameOver = document.getElementById("gameover");
let sound = document.getElementById("sound");

const audio = new Audio("./sounds/heart-of-the-sea-01.mp3");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
let game = undefined;

window.onload = () => {
  sound.innerHTML = "Unmute Sound";
  sound.addEventListener("click", () => {
    const buttonText = sound.innerHTML;
    if (buttonText === "Unmute Sound") {
      sound.innerHTML = "Mute Sound";
      audio.play();
    } else {
      sound.innerHTML = "Unmute Sound";
      audio.pause();
    }
  });
};

function startGame() {
  console.log("start game");
  splashScreen.style.display = "none";
  gameOver.style.display = "none";
  if (game !== undefined) {
    game.removeObstacles();
    game = undefined;
  }
  game = new Game();
  game.start();
  new MobileScreen();
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];
    if (possibleKeystrokes.includes(key)) {
      // Update player's directionX and directionY based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -3;
          break;
        case "ArrowUp":
          game.player.directionY = -3;
          break;
        case "ArrowRight":
          game.player.directionX = 3;
          break;
        case "ArrowDown":
          game.player.directionY = 3;
          break;
      }
    }
  });
  document.addEventListener("keyup", (event) => {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    if (possibleKeystrokes.includes(key)) {
      // Update player's directionX and directionY based on the key pressed
      switch (key) {
        case "ArrowLeft":
        case "ArrowRight":
          game.player.directionX = 0;
          break;
        case "ArrowUp":
        case "ArrowDown":
          game.player.directionY = 0;
          break;
      }
    }
  });
}

function restartGame() {
  location.reload();
}
