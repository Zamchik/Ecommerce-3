import { useState } from "react";
import styles from "./ProductCard.module.css";


const ProductCard = ({ product, cart, setCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = product.images;
  const totalImages = images.length;

  const quantity = cart[product.id] || 0;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const formatPrice = (price) => `$${price.toLocaleString("en-US")}`;

  const addToCart = () => {
    setCart((prev) => ({ ...prev, [product.id]: 1 }));
  };

  const increaseQuantity = () => {
    setCart((prev) => ({
      ...prev,
      [product.id]: prev[product.id] + 1,
    }));
  };

  const decreaseQuantity = () => {
    setCart((prev) => {
      const newQty = prev[product.id] - 1;
      if (newQty <= 0) {
        const { [product.id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [product.id]: newQty };
    });
  };


  return (
    <div className={styles.product_card}>
      {/* Карусель */}
      <div className={styles.image_carousel}>
        <div className={styles.image_container}>
          <img
            src={images[currentImageIndex]}
            alt={`${product.brand} ${product.model}`}
            className={styles.product_image}
          />
          {/* Бейдж Special Offer */}
          {product.isSpecialOffer && (
            <div className={styles.special_offer_badge}>Special Offer</div>
          )}
          {/* Кнопка избранного */}
          <button className={styles.favorite_button} onClick={toggleFavorite}>
            {isFavorite ? "❤️" : "♡"}
          </button>
          {/* Стрелки переключатели */}
          {totalImages > 1 && (
            <>
              <button className={styles.carousel_arrow_left} onClick={handlePrevImage}>
                ‹
              </button>
              <button className={styles.carousel_arrow_right} onClick={handleNextImage}>
                ›
              </button>
            </>
          )}
        </div>
        {/* Индикатор количества фото */}
        {totalImages > 1 && (
          <div className={styles.image_counter}>
            {currentImageIndex + 1} / {totalImages}
          </div>
        )}
      </div>

      {/* Информация о товаре */}
      <div className={styles.product_info}>
        <div className={styles.product_brand}>{product.brand}</div>
        <div className={styles.product_model}>{product.model}</div>
        <div className={styles.product_price}>{formatPrice(product.price)}</div>
      </div>

      {/* Секция добавления в корзину */}
      <div className={styles.cart_section}>
        {quantity === 0 ? (
          <button className={styles.add_to_cart_btn} onClick={addToCart}>
            Add to Cart
          </button>
        ) : (
          <div className={styles.cart_counter}>
            <button className={styles.counter_btn} onClick={decreaseQuantity}>
              −
            </button>
            <span className={styles.counter_value}>{quantity} in cart</span>
            <button className={styles.counter_btn} onClick={increaseQuantity}>
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;