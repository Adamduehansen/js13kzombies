const context = document.getElementById('g').getContext('2d');

function makeText(context) {
  return {
    text: '',
    size: 32,
    x: 0,
    y: 0,
    update: function (text, size, x, y) {
      this.text = text;
      this.size = size;
      this.x = x;
      this.y = y;
    },
    draw: function () {
      context.font = `${this.size}px arial`;
      context.fillStyle = 'white';
      context.fillText(this.text, this.x, this.y);
    },
  };
}

const scene = {
  enemies: 0,
  zombies: 0,
  enemiesText: makeText(context),
  zombiesText: makeText(context),
  update: function () {
    this.enemiesText.update(`Enemies: ${this.enemies}`, 16, 10, 20);
    this.zombiesText.update(`Zombies ${this.zombies}`, 16, 10, 64);
  },
  draw: function () {
    this.enemiesText.draw();
    this.zombiesText.draw();
  },
};

function main() {
  context.fillStyle = 'green';
  context.fillRect(0, 0, 600, 600);
  scene.update();
  scene.draw();
  requestAnimationFrame(main);
}

main();
