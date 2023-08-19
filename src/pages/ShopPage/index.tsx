import { Link } from "react-router-dom";
import gamesIcon from "../../assets/game-controller.png";
import styles from "./styles.module.css";

const dummyData = [
  {
    id: 2,
    name: "Recliner",
    image: "https://images.unsplash.com/photo-1685453628701-bdf02c353bda?w=300&h=300&fit=crop",
  },
  {
    id: 1,
    name: "Headphones",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Sofa",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=300&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Suit",
    image: "https://images.unsplash.com/photo-1548454782-15b189d129ab?w=300&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Jeans",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Dining Table",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=300&h=300&fit=crop",
  },
];

const Listing = () => {
  return (
    <div className={styles.productListing}>
      {dummyData.map((item) => (
        <div key={item.id} className={styles.productItem}>
          <img src={item.image} alt={item.name} className={styles.productImage} />
          <h3 className={styles.productName}>{item.name}</h3>
          <div className={styles.ctaButtons}>
            <button className={`${styles.ctaButton} ${styles.buyNow}`}>Buy Now</button>
            <button className={`${styles.ctaButton} ${styles.addToCart}`}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const ShopPage = () => {
  return (
    <div>
      <Listing />
      <Link to="/play-games" className={styles.floating}>
        <img src={gamesIcon} alt="Play games" />
      </Link>
    </div>
  );
};

export default ShopPage;
