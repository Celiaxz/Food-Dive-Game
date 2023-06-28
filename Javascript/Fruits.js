class Fruits {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.right = 0;
    this.top = Math.floor(Math.random() * 500 + 70);
    this.width = 80;
    this.height = 100;
    this.imageSources = [
      "./Images/food-1.gif",
      "./Images/food-2.gif",
      "./Images/food-3.gif",

      // Add more image sources here
    ];
    this.element = document.createElement("img");

    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.right = `${this.right}px`;
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
    this.element.style.top = `${this.top}px`;
    this.element.style.right = `${this.right}px`;
  }
}
