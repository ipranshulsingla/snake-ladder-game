import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const DisclaimerPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Disclaimer</h1>
      <p>
        Dear Respondent, The following experiment is intended to elicit your valuable opinion regarding the Game and
        Rewards. Feel free to provide your valuable Views and opinions which will be used exclusively for academic
        purposes only. We assure you that the information so collected will be kept confidential.
      </p>

      <Link className={styles.linkBtn} to="/shop">
        Continue to website
      </Link>
    </div>
  );
};

export default DisclaimerPage;
