import styles from "./PriceRange.module.css";

const PriceRange = ({ minPrice, maxPrice, onMinChange, onMaxChange }) => {
  return (
    <div className={styles.container_priceRange}>
      <label className={styles.label_priceRange}>Price Range</label>
      <div className={styles.container_min_max_PriceRange}>
        <input
          className={styles.min_PriceRange}
          value={minPrice}
          onChange={(e) => onMinChange(e.target.value)}
          type="number"
          placeholder="Min"
        />
        <input
          className={styles.max_PriceRange}
          value={maxPrice}
          onChange={(e) => onMaxChange(e.target.value)}
          type="number"
          placeholder="Max"
        />
      </div>
    </div>
  );
};

export default PriceRange;