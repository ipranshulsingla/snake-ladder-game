import React from "react";

import styles from "./styles.module.css";

import gameIcon from "../../assets/snake-ladder-game.jpeg";
import { Link } from "react-router-dom";

const GamesPage = () => {
  const handleClick = async () => {
    const ele = document.getElementById("body");

    try {
      await ele?.requestFullscreen();
    } catch {}
  };

  return (
    <div className={styles.container}>
      <h2 style={{ textAlign: "center" }}>Play and Win Guaranteed Rewards</h2>
      <Link onClick={handleClick} className={styles.gameItem} to="/snake-ladder">
        <img width="100%" src={gameIcon} alt="Play Snake & Ladder" />
        <p>Snake & Ladder</p>
        <div className={styles.playBtn}>Play</div>
      </Link>
    </div>
  );
};

export default GamesPage;
