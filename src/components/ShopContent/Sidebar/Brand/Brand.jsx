import styles from "./Brand.module.css";

const Brand = ({ value, onChange, brands }) => {
  return (
    <div className={styles.container_brand}>
      <label className={styles.label_brand}>Brand</label>
      <select
        id="brand"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.select}
      >
        <option value="">All Brands</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Brand;