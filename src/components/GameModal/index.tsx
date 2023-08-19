import React, { useState, ChangeEvent } from "react";
import styles from "./styles.module.css"; // Import the CSS module

interface SnakeLadderModalProps {
  onStartGame: (username: string) => void;
}

const SnakeLadderModal: React.FC<SnakeLadderModalProps> = ({ onStartGame }) => {
  const [username, setUsername] = useState<string>("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleStartGame = () => {
    if (username.trim() === "") {
      alert("Please enter a valid username to start the game.");
    } else {
      onStartGame(username);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.heading}>Snake & Ladder Game</h2>
        <div className={styles.inputContainer}>
          <label htmlFor="username">Enter your name:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className={styles.inputField}
          />
        </div>
        <button onClick={handleStartGame} className={styles.startButton}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default SnakeLadderModal;
