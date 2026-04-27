import styles from './SpecialDeal.module.css'
import Cross from '../assets/Cross.png'
import Timer from '../assets/Timer.png'

const SpecialDeal = () => {
  return (
    <>
      <button className={styles.button}>
        <img src={Cross} alt='cross' />
      </button>
      <div className={styles.container} >
        <div className={styles.heading}>
          <img src={Timer} alt='timer' />
          Special Deal!
        </div>
        <div className={styles.paragraph}>
          Register now to unlock exclusive offers and discounts
        </div>
        <div className={styles.offer_expire}>
          <div className={styles.offer_expire_text}>
            Offer expires in:
          </div>
          <div className={styles.timer}>
            0:59:59
          </div>
        </div>
      </div>
    </>
  )
}

export default SpecialDeal