class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.right = 0;
    this.top = Math.floor(Math.random() * 500 + 70);
    if (this.top > 510) {
      this.top = 510;
    }
    this.width = 80;
    this.height = 100;
    this.imageSources = [
      "./Images/SlimeOrange_00021.png",
      "./Images/SlimeBasic_00004.png",
      "./Images/monster.png",

      // Add more image sources here
    ];

    this.element = document.createElement("img");
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    this.element.style.position = 'absolute';
    this.element.style.top = '0';
    this.element.style.right = '0';

    this.element.style.transform = 'translate3d(var(--left), var(--top), 0)';
    this.element.style.willChange = 'transform';
    this.element.style.zIndex = '10';

    this.gameScreen.appendChild(this.element);
    this.setImageSource();
  }

  setImageSource() {
    const randomIndex = Math.floor(Math.random() * this.imageSources.length);
    const imageSource = this.imageSources[randomIndex];
    this.element.src = imageSource;
  }

  move() {
    this.right += 3;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.setProperty('--top', `${this.top}px`);
    this.element.style.setProperty('--left', `${-this.right}px`);
  }
}
