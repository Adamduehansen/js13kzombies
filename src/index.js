// Could make this a 'var' instead to save function arguments.
const canvas = document.getElementById('g');
const context = canvas.getContext('2d');

function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * 600),
    y: Math.floor(Math.random() * 600),
  };
}

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

function makeTombstone(context) {
  return {
    x: 0,
    y: 0,
    update: function () {
      this.x = x;
      this.y = y;
    },
    draw: function () {
      context.fillStyle = 'gray';
      context.fillRect(this.x, this.y, 32, 32);
    },
  };
}

function makePlayer(context) {
  return {
    x: 100,
    y: 100,
    update: function (x, y) {
      this.x = x;
      this.y = y;
    },
    draw: function () {
      context.fillStyle = 'red';
      context.fillRect(this.x, this.y, 32, 32);
    },
  };
}

const scene = {
  enemies: 0,
  zombies: 0,
  tombstones: Array(5)
    .fill()
    .map(() => {
      const tombStone = makeTombstone(context);
      const { x, y } = getRandomPosition();
      tombStone.x = x;
      tombStone.y = y;
      return tombStone;
    }),
  player: makePlayer(context),
  enemiesText: makeText(context),
  zombiesText: makeText(context),
  update: function () {
    this.enemiesText.update(`Enemies: ${this.enemies}`, 16, 10, 20);
    this.zombiesText.update(`Zombies ${this.zombies}`, 16, 10, 40);
  },
  draw: function () {
    this.tombstones.forEach((tombStone) => {
      tombStone.draw();
    });
    this.player.draw();
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
