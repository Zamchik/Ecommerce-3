// TvListing.jsx
import { useState } from "react";
import productsData from "../../../../data/products";
import Sidebar from "../../Sidebar/Sidebar";
import ProductCatalog from "../../ProductCatalog/ProductCatalog";
import styles from "./LaptopListing.module.css";

const LaptopListing = ({ cart, setCart }) => {
  const category = "laptop";

  const [brandFilter, setBrandFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("price-asc");

  const [appliedFilters, setAppliedFilters] = useState({
    brand: "",
    min: "",
    max: 5000,
  });

  const brands = [
    ...new Set(
      productsData
        .filter((p) => p.category === category)
        .map((p) => p.brand)
    ),
  ];

  const applyFilters = () => {
    setAppliedFilters({
      brand: brandFilter,
      min: minPrice,
      max: maxPrice,
    });
  };

  const filteredProducts = productsData
    .filter((p) => p.category === category)
    .filter((p) => {
      if (appliedFilters.brand && p.brand !== appliedFilters.brand) return false;
      const minOk = appliedFilters.min === "" || p.price >= Number(appliedFilters.min);
      const maxOk = p.price <= Number(appliedFilters.max);
      return minOk && maxOk;
    });

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sortBy === "price-asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <div className={styles.container_shopContent}>
      <Sidebar
        brands={brands}
        brandFilter={brandFilter}
        setBrandFilter={setBrandFilter}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        onApply={applyFilters}
      />
      <ProductCatalog
        products={sortedProducts}
        cart={cart}
        setCart={setCart}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalCount={sortedProducts.length}
      />
    </div>
  );
};

export default LaptopListing;