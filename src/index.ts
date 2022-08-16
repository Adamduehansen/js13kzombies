type Scene<SceneComps = any> = {
  draw: () => void;
  update: () => void;
} & SceneComps;

type CompProps = {
  context: CanvasRenderingContext2D;
};

type Comp = {
  draw: () => void;
};

function TextComp(text: string, { context }: CompProps): Comp {
  return {
    draw: function () {
      context.fillText(text, 100, 100);
    },
  };
}

const context2D = (
  document.getElementById('g') as HTMLCanvasElement
).getContext('2d')!;

const menuScene: Scene<{
  title: Comp;
}> = {
  title: TextComp('Hello, World!', {
    context: context2D,
  }),
  draw: function () {
    this.title.draw();
  },
  update: function () {},
};

let currentScene: Scene = menuScene;

function main() {
  context2D.clearRect(0, 0, 400, 800);
  currentScene.draw();
  currentScene.update();
  requestAnimationFrame(main);
}

main();
