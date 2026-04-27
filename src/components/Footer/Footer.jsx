import { useState } from "react";
import styles from "./Footer.module.css";

function Footer() {
  const [subscribeChange, setSubscribeChange] = useState("");
  
  const handlerSubscribeChange = (event) => {
    setSubscribeChange(event.target.value);
  };

  return (
    <footer className={styles.container_footer_and_copyright}>
      <div className={styles.container_footer}>
        <div className={styles.footer_column}>
          <div className={styles.footer_header}>About</div>
          <div className={styles.footer_item}>About Us</div>
          <div className={styles.footer_item}>Careers</div>
          <div className={styles.footer_item}>Press</div>
        </div>
        <div className={styles.footer_column}>
          <div className={styles.footer_header}>Support</div>
          <div className={styles.footer_item}>Contact</div>
          <div className={styles.footer_item}>FAQ</div>
          <div className={styles.footer_item}>Shipping</div>
        </div>
        <div className={styles.footer_column}>
          <div className={styles.footer_header}>Legal</div>
          <div className={styles.footer_item}>Privacy Policy</div>
          <div className={styles.footer_item}>Terms of Service</div>
          <div className={styles.footer_item}>Returns</div>
        </div>
        <div className={styles.footer_column}>
          <div className={styles.footer_header}>Newsletter</div>
          <form className={styles.footer_subscribe_form}>
            <label>Subscribe for exclusive deals</label>
            <div className={styles.container_input_subscribe}>
              <input
                value={subscribeChange}
                onChange={handlerSubscribeChange}
                type="text"
                className={styles.input_email}
                placeholder="Enter your email"
              />
              <button type="button" className={styles.button_newsletter}>
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.container_copyright}>
        © 2026 TechStore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
