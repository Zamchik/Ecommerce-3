import styles from "./ProductSort.module.css";

const ProductSort = ({ totalCount, sortBy, setSortBy }) => {
  return (
    <>
      <div className={styles.count}>{totalCount} products</div>
      <select
        className={styles.select}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </>
  );
};

export default ProductSort;