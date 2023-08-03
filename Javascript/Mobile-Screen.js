class MobileScreen {
  constructor() {
    this.initialise();
  }

  initialise() {
    const buttons = document.querySelectorAll("#mobile-controls .touch-icon");

    for (const button of buttons) {
      button.addEventListener('mousedown', (event) => {
        this.handleTouchStart(event.target.id);
      }, false);
      button.addEventListener('mouseup', (event) => {
        this.handleTouchEnd(event.target.id);
      }, false);

      button.addEventListener('touchstart', (event) => {
        this.handleTouchStart(event.target.id);
      }, false);
      button.addEventListener('touchend', (event) => {
        this.handleTouchEnd(event.target.id);
      }, false);
    }
  }

  handleTouchStart(buttonId) {
    switch (buttonId) {
      case "left-icon":
        game.player.directionX = -3;
        break;
      case "up-icon":
        game.player.directionY = -3;
        break;
      case "right-icon":
        game.player.directionX = 3;
        break;
      case "down-icon":
        game.player.directionY = 3;
        break;
    }
  }

  handleTouchEnd(buttonId) {
    switch (buttonId) {
      case "left-icon":
      case "right-icon":
        game.player.directionX = 0;
        break;
      case "up-icon":
      case "down-icon":
        game.player.directionY = 0;
        break;
    }
  }
}
