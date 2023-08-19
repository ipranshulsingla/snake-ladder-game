class Snake {
  readonly startPos: number;
  readonly endPos: number;

  constructor(startPos: number, endPos: number) {
    if (startPos <= endPos) {
      throw new Error("Snake startPos can't be less than or equal to endPos");
    }

    this.startPos = startPos;
    this.endPos = endPos;
  }
}

export default Snake;
