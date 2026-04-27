import Brand from "./Brand/Brand";
import PriceRange from "./PriceRange/PriceRange";
import SpecialDeal from "./SpecialDeal/SpecialDeal";
import styles from "./Sidebar.module.css";
import { useState } from "react";

const Sidebar = ({
  brands,
  brandFilter,
  setBrandFilter,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onApply,
}) => {

  const [showBanner, setShowBanner] = useState(true)

  return (
    <aside className={styles.sidebar}>
      <div className={styles.container_filters}>
        <label className={styles.label_filters}>Filters</label>
        <div className={styles.container_brand_priceRange}>
          <Brand
            value={brandFilter}
            onChange={setBrandFilter}
            brands={brands}
          />
          <PriceRange
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinChange={setMinPrice}
            onMaxChange={setMaxPrice}
          />
          <button className={styles.apply_filters} onClick={onApply}>
            Apply Filters
          </button>
        </div>
      </div>
      {showBanner && (
        <section className={styles.register_banner}>
          <SpecialDeal onClose={() => setShowBanner(false)} />
        </section>
      )}
    </aside>
  );
};

export default Sidebar;