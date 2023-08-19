import Lottie from "react-lottie";
import confetti from "../../assets/confetti.json";
import styles from "./styles.module.css"; // Import the CSS module

interface RewardModalProps {
  isOpen: boolean;
  isWinner: boolean;
  onClose: () => void;
  couponURL: string;
}

const RewardModal = ({ isOpen, isWinner, onClose, couponURL }: RewardModalProps) => {
  const message =
    "Game Over!\n\n" + (isWinner ? "Congratulations! You've won!" : "Don't give up! Better luck next time.");

  return isOpen ? (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <h2 style={{ whiteSpace: "pre-line" }}>{message}</h2>
        <img src={couponURL} alt="Reward Coupon" />
        <button onClick={onClose}>Collect Reward</button>
      </div>
      {isWinner && (
        <div style={{ position: "absolute", inset: 0 }}>
          <Lottie isClickToPauseDisabled options={{ animationData: confetti, autoplay: true }} />
        </div>
      )}
    </div>
  ) : null;
};

export default RewardModal;
