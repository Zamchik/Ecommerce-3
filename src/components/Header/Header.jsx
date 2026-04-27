import styles from './Header.module.css'
import Navigation from './Navigation/Navigation'

const Header = ({ pageType, setPageType, cart }) => {
  return (
    <header className={styles.header}>
      <Navigation
        pageType={pageType}
        setPageType={setPageType}
        cart={cart}
      />
    </header>
  )
}

export default Header