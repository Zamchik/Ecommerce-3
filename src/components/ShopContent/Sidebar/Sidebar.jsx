import Brand from "./Brand/Brand";
import PriceRange from "./PriceRange/PriceRange";
import SpecialDeal from "./SpecialDeal/SpecialDeal";
import styles from "./Sidebar.module.css";
import { useState } from "react";
import WeatherWidget from "./WeatherWidget/WeatherWidget";
import Modal from "./ModalWindow/Modal";

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

  const [showSpecialDeal, setShowSpecialDeal] = useState(true);
const [showWeather, setShowWeather] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {showSpecialDeal && (
        <section className={styles.register_banner}>
          <SpecialDeal onClose={() => setShowSpecialDeal(false)} />
        </section>
      )}
      {showWeather && (
        <section className={styles.weather_widget}>
          <WeatherWidget onClose={() => setShowWeather(false)} />
        </section>
      )}
      <button onClick={() => setIsModalOpen(true)} className={styles.openModalBtn}>
        Open ModalWindow
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Test Modal Window</h2>
        <p>Some text</p>
        <button onClick={() => alert('Test')}>Example Action</button>
      </Modal>
    </aside>
  );
};

export default Sidebar;