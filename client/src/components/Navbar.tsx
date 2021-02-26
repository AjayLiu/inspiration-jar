import styles from '@styles/Navbar.module.css'
const Navbar: React.FC = () => {
    return (
        <nav>
            <div className={styles.container}>
                <ul className={styles.listContainer}>
                    <li className={styles.listItem}><a href="/">Home</a></li>
                    <li className={styles.listItem}><a href="/account">My Account</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;