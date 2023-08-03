class Diver {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.width = 250;
    this.height = 180;
    this.top = 480;
    this.left = 180;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");

    this.element.src = "./Images/diver-anim-1.gif";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    this.element.style.position = 'absolute';
    this.element.style.top = '0';
    this.element.style.left = '0';

    this.element.style.transform = 'translate3d(var(--left), var(--top), 0)';
    this.element.style.willChange = 'transform';
    this.element.style.zIndex = '10';

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    // handles left border
    this.left = Math.max(10, this.left);

    // handles top border
    this.top = Math.max(10, this.top);

    // handles right border
    this.left = Math.min(this.left, this.gameScreen.offsetWidth - this.width - 50);

    // handles bottom border
    this.top = Math.min(this.top, this.gameScreen.offsetHeight - this.height - 10);

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.setProperty('--top', `${this.top}px`);
    this.element.style.setProperty('--left', `${this.left}px`);
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
