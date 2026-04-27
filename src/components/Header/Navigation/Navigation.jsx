import styles from "./Navigation.module.css";
import CartIcon from "../assets/Cart.png";
import ProfileIcon from "../assets/Profile.png";

const Navigation = ({ pageType, setPageType, cart }) => {

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  return (
    <nav className={styles.container_header}>
      <span
        className={styles.logoLink}
        onClick={() => setPageType('tv')}
      >
        <span className={styles.techstore}>TechStore</span>
      </span>

      <div className={styles.tabs_row}>
        <button
          className={`${styles.tab} ${pageType === "tv" ? styles.active : ""}`}
          onClick={() => setPageType("tv")}
        >
          TV
        </button>
        <button
          className={`${styles.tab} ${pageType === "phone" ? styles.active : ""}`}
          onClick={() => setPageType("phone")}
        >
          Phone
        </button>
        <button
          className={`${styles.tab} ${pageType === "laptop" ? styles.active : ""}`}
          onClick={() => setPageType("laptop")}
        >
          Laptop
        </button>
      </div>

      <div className={styles.navigation_right}>
        <button 
        className={styles.icon_Button}
        onClick={() => setPageType('cart')}
        >
          <img src={CartIcon} alt="cart" />
          {totalItems > 0 && (
            <span className={styles.cartBadge}>{totalItems}</span>
          )}
        </button>
        <button 
        className={styles.icon_Button}
        onClick={() => setPageType('profile')}>
          <img src={ProfileIcon} alt="profile" />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;