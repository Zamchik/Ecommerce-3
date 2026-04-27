import ProductCard from "./ProductCard/ProductCard";
import ProductSort from "./ProductSort/ProductSort";
import styles from "./ProductCatalog.module.css";

const ProductCatalog = ({
  products,
  cart,
  setCart,
  sortBy,
  setSortBy,
  totalCount,
}) => {
  return (
    <div className={styles.container_productCatalog}>
      <div className={styles.container_productSort}>
        <ProductSort
          totalCount={totalCount}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <div className={styles.container_productCard}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;