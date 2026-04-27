import { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ShopContent from "../components/ShopContent/ShopContent";
import styles from './Container.module.css'

const Container = () => {

  const [pageType, setPageType] = useState('tv');
  //Session Storage
  const [cart, setCart] = useState(() => {
  const saved = sessionStorage.getItem("cart");
  return saved ? JSON.parse(saved) : {};
});

useEffect(() => {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  return (
    <div className={styles.container_home}>
      <Header
        pageType={pageType}
        setPageType={setPageType}
        cart={cart} />
      <main>
        <ShopContent
          pageType={pageType}
          setPageType={setPageType}
          cart={cart}
          setCart={setCart}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Container;
