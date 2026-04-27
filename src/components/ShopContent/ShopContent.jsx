import Cart from "./Showсase/Cart/Cart";
import LaptopListing from "./Showсase/LaptopListing/LaptopListing";
import PhoneListing from "./Showсase/PhoneListing/PhoneListing";
import TvListing from "./Showсase/TvListing/TvListing";

const ShopContent = ({ pageType, setPageType, cart, setCart }) => {

  if (pageType === "tv") {
    return <TvListing 
    pageType={pageType} 
    setPageType={setPageType} 
    cart={cart} 
    setCart={setCart} />;
  }
  if (pageType === "laptop") {
    return <LaptopListing 
    pageType={pageType} 
    setPageType={setPageType} 
    cart={cart} 
    setCart={setCart} />;
  }
  if (pageType === "phone") {
    return <PhoneListing 
    pageType={pageType} 
    setPageType={setPageType} 
    cart={cart} 
    setCart={setCart} />;
  }
  if (pageType === "cart") {
    return <Cart 
    cart={cart} 
    setCart={setCart} 
    setPageType={setPageType} />;
  }
  return null
};

export default ShopContent;
