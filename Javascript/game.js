class Game {
  constructor() {
    this.startScreen = document.getElementById("splash");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("gameover");
    this.gameWinScreen = document.getElementById("stateGameWin");
    // this.height = 600;
    // this.width = 500;
    this.player = new Diver(this.gameScreen);
    this.obstacles = [];
    this.food = [];
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
    console.log(this.animateId);
    if (this.animateId % 200 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }

    if (this.animateId % 100 === 0) {
      this.food.push(new Plants(this.gameScreen));
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
    const foodToKeep = [];
    this.food.forEach((oneEat) => {
      oneEat.move();
      if (this.player.didCollide(oneEat)) {
        oneEat.element.remove();
        this.score += 1;
        document.getElementById("scoreNum").innerHTML = this.score;
      } else if (oneEat.top > this.gameScreen.offsetHeight) {
        this.score += 1;
      } else {
        foodToKeep.push(oneEat);
      }
    });
    this.food = foodToKeep;

    if (this.score === 20) {
      this.isWon = true;
    }

    if (this.lives <= 0) {
      this.isGameOver = true;
    }
  }

  gameWin() {
    this.player.element.remove();
    this.food.forEach((food) => food.element.remove());

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameWinScreen.style.display = "block";
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }
}
