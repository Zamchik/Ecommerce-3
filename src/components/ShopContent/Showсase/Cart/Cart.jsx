import productsData from "../../../../data/products";
import styles from "./Cart.module.css";

const Cart = ({ cart, setCart, setPageType }) => {
  const cartItems = productsData.filter((p) => cart[p.id]);

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <p className={styles.emptyMessage}>Your cart is empty</p>
        <button
          className={styles.primaryBtn}
          onClick={() => setPageType("tv")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * cart[item.id],
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const updateQuantity = (id, delta) => {
    setCart((prev) => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <div className={styles.cart}>
      <h1 className={styles.cartTitle}>Shopping Cart</h1>

      <div className={styles.cartContent}>
        <ul className={styles.cartList}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <img
                src={item.images[0]}
                alt={item.model}
                className={styles.itemImage}
              />
              <div className={styles.itemInfo}>
                <span className={styles.itemBrand}>{item.make}</span>
                <span className={styles.itemName}>{item.model}</span>
              </div>
              <div className={styles.quantityControls}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  −
                </button>
                <span className={styles.qtyValue}>{cart[item.id]}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => removeItem(item.id)}
                title="Remove"
              >
                🗑️
              </button>
              <span className={styles.itemTotal}>
                ${(item.price * cart[item.id]).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.summary}>
          <h3 className={styles.summaryTitle}>Order Summary</h3>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Subtotal</span>
            <span className={styles.summaryValue}>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Tax (8%)</span>
            <span className={styles.summaryValue}>${tax.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Shipping</span>
            <span className={styles.summaryValue}>Calculated at checkout</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span className={styles.summaryLabel}>Total</span>
            <span className={styles.summaryValue}>${total.toFixed(2)}</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.primaryBtn}>Proceed to Checkout</button>
            <button
              className={styles.secondaryBtn}
              onClick={() => setPageType("tv")}
            >
              Back to Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;