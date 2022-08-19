// Could make this a 'var' instead to save function arguments.
const context = document.getElementById('g').getContext('2d');

function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * 600),
    y: Math.floor(Math.random() * 600),
  };
}

function createText(context) {
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

function createTombstone(context) {
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

function createPlayer(context) {
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
  cursors: {
    up: false,
    right: false,
    down: false,
    left: false,
  },
  tombstones: Array(5)
    .fill()
    .map(() => {
      const tombStone = createTombstone(context);
      const { x, y } = getRandomPosition();
      tombStone.x = x;
      tombStone.y = y;
      return tombStone;
    }),
  player: createPlayer(context),
  enemiesText: createText(context),
  zombiesText: createText(context),
  update: function () {
    this.enemiesText.update(`Enemies: ${this.enemies}`, 16, 10, 20);
    this.zombiesText.update(`Zombies ${this.zombies}`, 16, 10, 40);
    const { x, y } = this.player;
    const newPlayerX = this.cursors.left
      ? x - 5
      : this.cursors.right
      ? x + 5
      : x;
    this.player.update(newPlayerX, 100);
  },
  draw: function () {
    this.tombstones.forEach((tombStone) => tombStone.draw());
    this.player.draw();
    this.enemiesText.draw();
    this.zombiesText.draw();
  },
};

document.addEventListener('keydown', (event) => {
  // Maybe switch takes less bytes
  if (event.code === 'ArrowLeft') {
    scene.cursors.left = true;
  }
  if (event.code === 'ArrowRight') {
    scene.cursors.right = true;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'ArrowLeft') {
    scene.cursors.left = false;
  }
  if (event.code === 'ArrowRight') {
    scene.cursors.right = false;
  }
});

function main() {
  context.fillStyle = 'green';
  context.fillRect(0, 0, 600, 600);
  scene.update();
  scene.draw();
  requestAnimationFrame(main);
}

main();
