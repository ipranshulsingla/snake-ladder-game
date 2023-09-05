import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import coachMark1 from "../../assets/coachmark1.jpg";
import coachMark2 from "../../assets/coachmark2.jpg";

const DisclaimerPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Disclaimer</h1>
      <p>
        Dear Respondent, The following experiment is intended to elicit your valuable opinion regarding the Game and
        Rewards. Feel free to provide your valuable Views and opinions which will be used exclusively for academic
        purposes only. We assure you that the information so collected will be kept confidential.
      </p>

      <br />

      <p>
        Imagine you are browsing an E-commerce app you usually use, named <b>Retail City</b>.
      </p>

      <div className={styles.coachMark}>
        <img src={logo} alt="" />
      </div>

      <p>
        You see a new icon on the home screen of the app. This new icon gives you option to play games within the app.
      </p>

      <div className={styles.coachMark} style={{ height: 400 }}>
        <img src={coachMark1} alt="" />
      </div>

      <p>
        You see game, mentioning guaranteed rewards. You click on one of the game, Snake and Ladder and start playing.
      </p>

      <div className={styles.coachMark} style={{ height: 400 }}>
        <img src={coachMark2} alt="" />
      </div>

      <Link className={styles.linkBtn} to="/shop">
        Continue to website
      </Link>
    </div>
  );
};

export default DisclaimerPage;
