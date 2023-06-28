class MobileScreen {
  constructor() {
    this.initialise();
  }

  initialise() {
    const touchIcons = document.getElementById("mobile-controls");
    const buttons = touchIcons.children;
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", (event) => {
        event.preventDefault();
        const buttonId = event.target.id;
        this.handleTouchStart(buttonId);

        setTimeout(() => {
          this.handleTouchEnd(buttonId);
        }, 100);
      });
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
