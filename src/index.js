/**
 IMPROVEMENTS TO MINIMIZE SIZE
 - Maybe create a higher order function with shared properties (x, y...) for components.
*/
var context = document.getElementById('g').getContext('2d');

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

function createTombstone() {
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

function createPlayer() {
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

function createEnemy() {
  // An enemy will spawn at random a point outside the canvas and then move to a
  // point inside the canvas and stay there. It will shoot a bullet at a interval
  // towards the current position of the player. If a enemy is bitten it will
  // either die or turn into a zombie.
  const destination = {
    x: Math.floor(Math.random() * 600),
    y: Math.floor(Math.random() * 600),
  };

  const enemy = {
    x: !!Math.floor(Math.random() * 2) ? 0 : 600,
    y: Math.floor(Math.random() * 600),
    update: function () {
      if (this.x < destination.x) {
        this.x += 1;
      } else if (this.x > destination.x) {
        this.x -= 1;
      }
      if (this.y < destination.y) {
        this.y += 1;
      } else if (this.y > destination.y) {
        this.y -= 1;
      }
    },
    draw: function () {
      context.fillStyle = 'yellow';
      context.fillRect(this.x, this.y, 32, 32);
    },
    turn: function () {
      clearInterval(intervalId);
    },
  };

  const intervalId = setInterval(() => {
    scene.bullets.push(createBullet(enemy.x, enemy.y));
  }, 3000);

  return enemy;
}

function createBullet(spawnX, spawnY) {
  const { x, y } = scene.player;
  const dx = spawnX < x ? 2 : -2;
  const dy = spawnY < y ? 2 : -2;
  return {
    x: spawnX,
    y: spawnY,
    update: function () {
      this.x += dx;
      this.y += dy;
    },
    draw: function () {
      context.fillStyle = 'blue';
      context.fillRect(this.x, this.y, 5, 5);
    },
  };
}

const scene = {
  enemies: [],
  zombies: [],
  bullets: [],
  pressedKeys: {},
  gameOver: false,
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
  updatePlayer: function () {
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
  update: function () {
    if (this.gameOver) {
      return;
    }
    this.bullets.forEach((bullet) => {
      if (
        bullet.x > this.player.x &&
        bullet.x < this.player.x + 32 &&
        bullet.y > this.player.y &&
        bullet.y < this.player.y + 32
      ) {
        this.gameOver = true;
      }
    });
    this.enemiesText.update(`Enemies: ${this.enemies.length}`, 16, 10, 20);
    this.zombiesText.update(`Zombies ${this.zombies.length}`, 16, 10, 40);
    this.enemies.forEach((enemy) => enemy.update());
    this.bullets.forEach((bullet) => bullet.update());
    this.updatePlayer();
  },
  draw: function () {
    this.tombstones.forEach((tombStone) => tombStone.draw());
    this.enemies.forEach((enemy) => enemy.draw());
    this.bullets.forEach((bullet) => bullet.draw());
    this.player.draw();
    this.enemiesText.draw();
    this.zombiesText.draw();
  },
};

setInterval(() => {
  scene.enemies.push(createEnemy(context));
}, 1000);

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
