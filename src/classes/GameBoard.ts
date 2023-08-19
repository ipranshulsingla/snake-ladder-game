import { DrawBag } from "../components/Canvas";
import getMarkerCoordsByPos from "../pages/GameBoardPage/helpers/getMarkerCoordsByPos";
import interpolate from "../utils/interpolate";
import Ladder from "./Ladder";
import Player from "./Player";
import ScheduledAnimationDurationBased from "./ScheduledAnimationDurationBased";
import ScheduledAnimationManager, { ScheduleUpdateFunc } from "./ScheduledAnimationManager";
import Snake from "./Snake";

type GameBoardConfig = {
  elements?: {
    [key: number]: Snake | Ladder;
  };
};

const defaultConfig = {
  elements: {
    4: new Ladder(4, 25),
    13: new Ladder(13, 46),
    27: new Snake(27, 5),
    33: new Ladder(33, 49),
    40: new Snake(40, 3),
    42: new Ladder(42, 63),
    43: new Snake(43, 18),
    50: new Ladder(50, 69),
    54: new Snake(54, 31),
    62: new Ladder(62, 81),
    66: new Snake(66, 45),
    74: new Ladder(74, 92),
    76: new Snake(76, 58),
    89: new Snake(89, 53),
    99: new Snake(99, 41),
  },
};

const LADDER_VELOCITY = 5;

function getXFromY(y: number, x1: number, y1: number, x2: number, y2: number) {
  // Calculate the slope
  const slope = (y2 - y1) / (x2 - x1);

  // Calculate the x-coordinate using the slope-intercept form of the equation
  const x = (y - y1) / slope + x1;

  return x;
}

class GameBoard {
  static DICE_FACES = 6;

  private animationManager = new ScheduledAnimationManager();
  private cellSize: number = 1;
  private counterSize: number = 1;

  players: Player[];
  playerTurnIndex: number = 0;
  elements: {
    [key: number]: Snake | Ladder;
  };
  gameOver: boolean = false;
  winner: Player | null = null;

  constructor(players: Player[], config: GameBoardConfig = {}) {
    const { elements = defaultConfig.elements } = config;

    this.players = [...players];
    this.elements = elements;
    this.setCellSize(1);
  }

  public setCellSize(size: number) {
    this.cellSize = size;
    this.players.forEach((player) => {
      const { x, y } = getMarkerCoordsByPos(player.position, this.cellSize);
      player.positionX = x;
      player.positionY = y;
    });
  }

  public setCounterSize(size: number) {
    this.counterSize = size;
  }

  public draw(bag: DrawBag) {
    this.animationManager.draw(bag);

    const currentPlayer = this.getCurrentPlayer();

    this.players.forEach((player) => {
      if (player !== currentPlayer) player.draw(bag.ctx, this.counterSize);
    });

    currentPlayer.draw(bag.ctx, this.counterSize);
  }

  private hasSnake(pos: number) {
    return !!(this.elements[pos] && this.elements[pos] instanceof Snake);
  }

  private hasLadder(pos: number) {
    return !!(this.elements[pos] && this.elements[pos] instanceof Ladder);
  }

  public getCurrentPlayer() {
    return this.players[this.playerTurnIndex];
  }

  public async movePlayer(diceNo: number) {
    if (this.gameOver) return;

    const player = this.getCurrentPlayer();

    const currentPos = player.position;
    const targetPos = currentPos + diceNo;

    if (targetPos > 100) {
      return;
    }

    const animateToTarget = () => {
      const steps = new Array(diceNo)
        .fill(null)
        .map((_, i) => player.position + i)
        .map(
          (currentPos) =>
            new ScheduledAnimationDurationBased(
              ({ progress }) => {
                player.position = currentPos + 1 * progress;
                player.scale = interpolate([0, 0.5, 1], [1, 1.2, 1], progress);
                const { x, y } = getMarkerCoordsByPos(player.position, this.cellSize);
                player.positionX = x;
                player.positionY = y;
              },
              { duration: 260, delay: 50 }
            )
        );

      return this.animationManager.scheduleAnimation(...steps);
    };

    if (this.hasSnake(targetPos)) {
      const snake = this.elements[targetPos];

      const { x: snakeStartX, y: snakeStartY } = getMarkerCoordsByPos(snake.startPos, this.cellSize);

      const { x: snakeEndX, y: snakeEndY } = getMarkerCoordsByPos(snake.endPos, this.cellSize);

      const animateToSnakeEnd: ScheduleUpdateFunc = (_, done) => {
        player.positionY = Math.min(player.positionY + LADDER_VELOCITY, snakeEndY);
        player.positionX = getXFromY(player.positionY, snakeStartX, snakeStartY, snakeEndX, snakeEndY);

        if (player.positionY >= snakeEndY) {
          player.position = snake.endPos;
          done();
        }
      };

      await animateToTarget();
      await this.animationManager.scheduleAnimation(animateToSnakeEnd);
    } else if (this.hasLadder(targetPos)) {
      const ladder = this.elements[targetPos];

      const { x: ladderStartX, y: ladderStartY } = getMarkerCoordsByPos(ladder.startPos, this.cellSize);

      const { x: ladderEndX, y: ladderEndY } = getMarkerCoordsByPos(ladder.endPos, this.cellSize);

      const animateToLadderEnd: ScheduleUpdateFunc = (_, done) => {
        player.positionY = Math.max(player.positionY - LADDER_VELOCITY, ladderEndY);
        // player.scale =
        player.positionX = getXFromY(player.positionY, ladderStartX, ladderStartY, ladderEndX, ladderEndY);

        if (player.positionY <= ladderEndY) {
          player.position = ladder.endPos;
          done();
        }
      };

      await animateToTarget();
      await this.animationManager.scheduleAnimation(animateToLadderEnd);
    } else {
      await animateToTarget();
      if (targetPos === 100) {
        this.gameOver = true;
        this.winner = player;
      }
    }
  }

  public nextTurn() {
    if (this.gameOver) return;

    if (this.playerTurnIndex >= this.players.length - 1) this.playerTurnIndex = 0;
    else this.playerTurnIndex += 1;
  }

  throwDice = () => {
    const diceNo = Math.floor(Math.random() * GameBoard.DICE_FACES) + 1;

    return diceNo;
  };
}

export default GameBoard;
