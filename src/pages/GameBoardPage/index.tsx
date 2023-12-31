import classNames from "classnames";
import { useCallback, useDeferredValue, useEffect, useRef, useState } from "react";
import GameBoard from "../../classes/GameBoard";
import Player from "../../classes/Player";
import Arrow from "../../components/Arrow";
import Canvas, { DrawBag } from "../../components/Canvas";
import Die from "../../components/Die";
import SnakeLadderModal from "../../components/GameModal";
import RewardModal from "../../components/RewardModal";
import useSafeCallback from "../../hooks/useSafeCallback";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import noop from "../../utils/noop";
import roundToLeastMultiple from "../../utils/roundToLeastMultiple";
import styles from "./styles.module.css";

import coupon1 from "../../assets/coupons/coupon1.webp";
import coupon2 from "../../assets/coupons/coupon2.webp";
import coupon3 from "../../assets/coupons/coupon3.webp";
import coupon4 from "../../assets/coupons/coupon4.webp";
import logo from "../../assets/logo.png";

const coupons = [
  {
    id: "REWARD_101",
    couponUrl: coupon1,
  },
  {
    id: "REWARD_102",
    couponUrl: coupon2,
  },
  {
    id: "REWARD_103",
    couponUrl: coupon3,
  },
  {
    id: "REWARD_104",
    couponUrl: coupon4,
  },
];

const generateGoogleFormLink = (name: string, couponId: string, isWinner: boolean) => {
  const nameKey = "entry.1261676882";
  const couponIdKey = "entry.1739122908";
  const gameResultKey = "entry.238967404";

  const urlObj = new URL(
    "https://docs.google.com/forms/d/e/1FAIpQLSd3XqJnHuxdCFgZcmKOiL1ct6uU3nMDEAzz41guvgv-fFzFxA/viewform?usp=pp_url&entry.1261676882=Name&entry.1739122908=ID&entry.238967404=Result"
  );

  urlObj.searchParams.set(nameKey, name);
  urlObj.searchParams.set(couponIdKey, couponId);
  urlObj.searchParams.set(gameResultKey, isWinner ? "Won" : "Lost");

  return urlObj.toString();
};

const initGame = (realPlayerName: string = "Real") => {
  const realPlayer = new Player(realPlayerName, Player.CounterColor.YELLOW);
  const computerPlayer = new Player("Computer", Player.CounterColor.BLUE);

  const game = new GameBoard([realPlayer, computerPlayer]);

  return { game, realPlayer, computerPlayer };
};

function GameBoardPage() {
  // DIMENSIONS
  const { width, height } = useWindowDimensions();

  let size = 0;
  if (width > height) {
    size = roundToLeastMultiple(height * 0.8, 10);
  } else {
    size = roundToLeastMultiple(width * 0.95, 10);
  }

  const boardSize = useDeferredValue(size);
  const boardSizeLogical = boardSize * devicePixelRatio;
  const cellSize = boardSizeLogical / 10;
  const counterSize = (cellSize / 2) * 0.8;

  const [{ game, computerPlayer, realPlayer }, setGameBoard] = useState(initGame);

  const [dieDisabled, setBtnDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [coupon, setCoupon] = useState<(typeof coupons)[0] | null>(coupons[0]);
  const dieRef = useRef<HTMLDivElement>(null);

  const currentPlayer = game.getCurrentPlayer();

  useEffect(() => {
    game.setCellSize(cellSize);
    game.setCounterSize(counterSize);
  }, [cellSize, counterSize, game]);

  useEffect(() => {
    if (currentPlayer === computerPlayer) {
      dieRef.current?.click();
    }
  }, [currentPlayer, computerPlayer]);

  useEffect(() => {
    if (game.gameOver) {
      const randomCoupon = coupons[Math.floor(Math.random() * coupons.length)];
      setCoupon(randomCoupon);
    }
  }, [game.gameOver]);

  const draw = useCallback(
    (bag: DrawBag) => {
      game.draw(bag);
    },
    [game]
  );

  const handleRollDie = useSafeCallback(async (dieNo: number) => {
    setBtnDisabled(true);
    await game.movePlayer(dieNo);
    game.nextTurn();
    setBtnDisabled(false);
  });

  const handleStartGame = (username: string) => {
    setGameBoard(initGame(username));
    setModalVisible(false);
  };

  const handleCollectReward = async () => {
    try {
      await document.exitFullscreen?.().catch(noop);
      const url = generateGoogleFormLink(realPlayer.name, coupon!.id, game.winner === realPlayer);
      window.location.href = url;
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} width="100%" height="100%" alt="" />
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        className={classNames(modalVisible && styles.hideBoard)}
      >
        <Canvas
          width={boardSize}
          height={boardSize}
          className={styles.canvas}
          draw={game.gameOver ? undefined : draw}
        />
        <div className={styles.controls} style={{ width: boardSize }}>
          <div className={styles.playersContainer}>
            {game.players.map((it, i) => {
              return (
                <div
                  key={it.counterColor}
                  className={classNames(styles.playerContainer, i % 2 === 0 ? styles.playerLeft : styles.playerRight)}
                >
                  <p style={{ color: it.counterColor }} className={styles.playerNameTxt}>
                    {it.name}
                  </p>
                  {it === currentPlayer && (
                    <Arrow className={i % 2 === 0 ? styles.playerLeftIcon : styles.playerRightIcon} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <Die ref={dieRef} disabled={dieDisabled} onRoll={handleRollDie} game={game} />
      </div>
      {modalVisible && <SnakeLadderModal onStartGame={handleStartGame} />}
      <RewardModal
        isWinner={game.winner === realPlayer}
        isOpen={game.gameOver}
        onClose={handleCollectReward}
        couponURL={coupon?.couponUrl}
      />
    </div>
  );
}

export default GameBoardPage;
