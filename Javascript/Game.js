class Game {
  constructor() {
    this.startScreen = document.getElementById("splash");
    this.gameScreen = document.getElementById("game-screen");
    this.winOrLost = document.getElementById("winOrLost");
    this.scoreCount = document.getElementById("scoreCount");
    this.gameover = document.getElementById("gameover");

    this.player = new Diver(this.gameScreen);
    this.obstacles = [];
    this.fruits = [];
    this.isGameOver = false;
    this.isWon = false;
    this.score = 1;
    this.lives = 3;
    document.getElementById("livesNum").innerHTML = this.lives;
    this.animateId;
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameLoop();
  }

  gameLoop() {
    this.update();
    if (this.animateId % 200 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }

    if (this.animateId % 100 === 0) {
      this.fruits.push(new Fruits(this.gameScreen));
    }

    if (this.isGameOver) {
      this.endGame();
    } else if (this.isWon) {
      this.gameWin();
    } else {
      this.animateId = requestAnimationFrame(() => this.gameLoop());
    }
  }

  update() {
    this.player.move();
    const obstaclesToKeep = [];
    this.obstacles.forEach((obstacle) => {
      obstacle.move();
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.lives -= 1;
        document.getElementById("livesNum").innerHTML = this.lives;
      } else if (obstacle.top > this.gameScreen.offsetHeight) {
        this.score += 1;
      } else {
        obstaclesToKeep.push(obstacle);
      }
    });
    this.obstacles = obstaclesToKeep;
    const fruitsToKeep = [];
    this.fruits.forEach((oneEat) => {
      oneEat.move();
      if (this.player.didCollide(oneEat)) {
        oneEat.element.remove();
        this.score += 1;
        document.getElementById("scoreNum").innerHTML = this.score;
      } else if (oneEat.top > this.gameScreen.offsetHeight) {
        this.score += 1;
      } else {
        fruitsToKeep.push(oneEat);
      }
    });
    this.fruits = fruitsToKeep;

    if (this.score === 20) {
      this.isWon = true;
    }

    if (this.lives <= 0) {
      this.isGameOver = true;
    }
  }

  gameWin() {
    this.player.element.remove();
    this.fruits.forEach((fruit) => fruit.element.remove());

    winOrLost.innerHTML = "Hurray!! You Saved All the Fruits!";
    this.scoreCount.innerHTML = this.score;

    // Hide game screen
    this.gameScreen.style.display = "none";
    this.gameover.style.display = null;
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    winOrLost.innerHTML = "Game Over";
    this.scoreCount.innerHTML = this.score;

    // Hide game screen
    this.gameScreen.style.display = "none";
    this.gameover.style.display = null;
  }
  removeObstacles() {
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
  }
}
