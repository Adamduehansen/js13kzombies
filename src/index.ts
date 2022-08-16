type Scene<SceneComps = any> = {
  draw: () => void;
  update: () => void;
} & SceneComps;

type CompProps = {
  context: CanvasRenderingContext2D;
};

type Comp<DrawOptions> = {
  draw: (options: DrawOptions) => void;
};

type TextComp = Comp<{
  size: number;
}>;

function TextComp(text: string, { context }: CompProps): TextComp {
  return {
    draw: function ({ size }) {
      context.font = `${size}px arial`;
      context.fillText(text, 100, 100);
    },
  };
}

const context2D = (
  document.getElementById('g') as HTMLCanvasElement
).getContext('2d')!;

const menuScene: Scene<{
  title: TextComp;
}> = {
  title: TextComp('Press space', {
    context: context2D,
  }),
  draw: function () {
    this.title.draw({
      size: 32,
    });
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
