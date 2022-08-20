/**
 IMPROVEMENTS TO MINIMIZE SIZE
 - Could make context a 'var' instead to save function arguments.
 - Maybe create a higher order function with shared properties (x, y...) for components.
*/
const context = document.getElementById('g').getContext('2d');

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
    x: 284,
    y: 284,
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

function createEnemy(context) {
  // An enemy will spawn at a point outside the canvas and then move to a point
  // inside the canvas and stay there. It will shoot a bullet at a interval
  // towards the current position of the player. If a enemy is bitten it will
  // either die or turn into a zombie.
  return {
    x: 0,
    y: 0,
  };
}

const scene = {
  enemies: [createEnemy()],
  zombies: [],
  pressedKeys: {},
  tombstones: Array(5)
    .fill()
    .map(() => {
      const tombStone = createTombstone(context);
      tombStone.x = Math.floor(Math.random() * 600);
      tombStone.y = Math.floor(Math.random() * 600);
      return tombStone;
    }),
  player: createPlayer(context),
  enemiesText: createText(context),
  zombiesText: createText(context),
  update: function () {
    this.enemiesText.update(`Enemies: ${this.enemies.length}`, 16, 10, 20);
    this.zombiesText.update(`Zombies ${this.zombies.length}`, 16, 10, 40);
    const { x, y } = this.player;
    let newPlayerX = x;
    let newPlayerY = y;
    if (this.pressedKeys['ArrowLeft']) {
      newPlayerX = x - 1;
    } else if (this.pressedKeys['ArrowRight']) {
      newPlayerX = x + 1;
    }
    if (this.pressedKeys['ArrowUp']) {
      newPlayerY = y - 1;
    } else if (this.pressedKeys['ArrowDown']) {
      newPlayerY = y + 1;
    }
    this.player.update(newPlayerX, newPlayerY);
  },
  draw: function () {
    this.tombstones.forEach((tombStone) => tombStone.draw());
    this.player.draw();
    this.enemiesText.draw();
    this.zombiesText.draw();
  },
};

// setInterval(() => {
//   scene.enemies.push(createEnemy(context));
// }, 1000);

document.addEventListener('keydown', (event) => {
  scene.pressedKeys[event.code] = true;
});

document.addEventListener('keyup', (event) => {
  scene.pressedKeys[event.code] = false;
});

function main() {
  context.fillStyle = 'green';
  context.fillRect(0, 0, 600, 600);
  scene.update();
  scene.draw();
  requestAnimationFrame(main);
}

main();
