/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import { forwardRef, useRef, useState } from "react";
import { useUpdateEffect } from "usehooks-ts";
import GameBoard from "../classes/GameBoard";
import styles from "./die.module.css";

type DieProps = {
  disabled?: boolean;
  onRoll?: (dieNo: number) => void;
};

function drawRandom() {
  return Math.floor(Math.random() * GameBoard.DICE_FACES) + 1;
}

const Die = forwardRef<HTMLDivElement, DieProps>(({ disabled, onRoll }, ref) => {
  const [animating, setAnimating] = useState(false);
  const dieNoRef = useRef(5);

  useUpdateEffect(() => {
    let frameId: number;
    let start = -1;
    let end: number = 0;

    if (animating) {
      const animate = (t: number) => {
        if (start < 0) {
          start = t;
        }

        frameId = requestAnimationFrame(animate);
        if (t - end >= 250 && t - start <= 1000) {
          dieNoRef.current = drawRandom();
          const sides = document.getElementsByClassName(styles.side);

          Array.from(sides).forEach((side) => {
            if (side.id === `side${dieNoRef.current}`) {
              return side.classList.add(styles.activeSide);
            }

            side.classList.remove(styles.activeSide);
          });

          end = t;
        }
      };

      frameId = requestAnimationFrame(animate);
    } else {
      onRoll?.(dieNoRef.current);
    }

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [animating, onRoll]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (disabled || animating) {
      return;
    }
    setAnimating(true);
  };

  const handleAnimationEnd = () => {
    setAnimating(false);
  };

  const classes = classNames(styles.die, animating && styles.rotate);

  return (
    <div ref={ref} onClick={handleClick} onAnimationEnd={handleAnimationEnd} className={classes}>
      <svg className="die" viewBox="0 0 100 100">
        <g id="side1" className={styles.side}>
          <circle cx="50" cy="50" r="6" fill="black" />
        </g>

        <g id="side2" className={styles.side}>
          <circle cx="75" cy="25" r="6" fill="black" />
          <circle cx="25" cy="75" r="6" fill="black" />
        </g>

        <g id="side3" className={styles.side}>
          <circle cx="25" cy="75" r="6" fill="black" />
          <circle cx="50" cy="50" r="6" fill="black" />
          <circle cx="75" cy="25" r="6" fill="black" />
        </g>

        <g id="side4" className={styles.side}>
          <circle cx="25" cy="25" r="6" fill="black" />
          <circle cx="75" cy="75" r="6" fill="black" />
          <circle cx="25" cy="75" r="6" fill="black" />
          <circle cx="75" cy="25" r="6" fill="black" />
        </g>

        <g id="side5" className={classNames(styles.side, styles.activeSide)}>
          <circle cx="25" cy="75" r="6" fill="black" />
          <circle cx="25" cy="25" r="6" fill="black" />
          <circle cx="75" cy="75" r="6" fill="black" />
          <circle cx="75" cy="25" r="6" fill="black" />
          <circle cx="50" cy="50" r="6" fill="black" />
        </g>

        <g id="side6" className={styles.side}>
          <circle cx="25" cy="25" r="6" fill="black" />
          <circle cx="25" cy="50" r="6" fill="black" />
          <circle cx="25" cy="75" r="6" fill="black" />
          <circle cx="75" cy="25" r="6" fill="black" />
          <circle cx="75" cy="50" r="6" fill="black" />
          <circle cx="75" cy="75" r="6" fill="black" />
        </g>
      </svg>
    </div>
  );
});

export default Die;
