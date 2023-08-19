enum CounterColor {
  RED = "#EB1c24",
  BLUE = "#22409a",
  YELLOW = "#ffe013",
  GREEN = "#02a04b",
}

class Player {
  readonly name: string;
  readonly counterColor: string;
  position: number = 1;
  positionX: number = 0;
  positionY: number = 0;
  scale: number = 1;

  static CounterColor = CounterColor;

  constructor(name: string, color: string) {
    this.name = name;
    this.counterColor = color;
  }

  public draw(ctx: CanvasRenderingContext2D, counterSize: number) {
    ctx.save();

    ctx.shadowColor = "#00000040";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.beginPath();
    ctx.fillStyle = this.counterColor;
    ctx.arc(this.positionX, this.positionY, counterSize * this.scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    ctx.beginPath();
    ctx.fillStyle = "#000000F2";
    ctx.arc(this.positionX, this.positionY, counterSize * 0.5 * this.scale, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default Player;
