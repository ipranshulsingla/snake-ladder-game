import logo from "../../assets/logo.png";
import styles from "./styles.module.css";

const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <img src={logo} alt="Retail City Logo" />
      </div>
      <div>
        <h1 style={{ fontSize: "2.2em" }}>Retail City</h1>
        <h2 style={{ fontSize: "1.8rem", color: "#bababa" }}> Grocery | Furniture | Apparels</h2>
      </div>
    </div>
  );
};

export default Navbar;
