import Ladder from "./Ladder";
import Player from "./Player";
import Snake from "./Snake";

class Square {
  readonly position: number;
  readonly snake?: Snake;
  readonly ladder?: Ladder;
  players: Player[];

  constructor(position: number, element?: Snake | Ladder) {
    this.position = position;

    this.players = [];

    if (element instanceof Snake) {
      this.snake = element;
    } else if (element instanceof Ladder) {
      this.ladder = element;
    }
  }

  hasSnake() {
    return !!this.snake;
  }

  hasLadder() {
    return !!this.ladder;
  }
}

export default Square;
