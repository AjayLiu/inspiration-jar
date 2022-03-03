import Link from "next/link";
import styles from "./Navbar.module.scss";
const Navbar: React.FC = () => {
  return (
    <nav>
      <div className={styles.container}>
        <ul className={styles.listContainer}>
          <li className={styles.listItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/account">
              <a>My Account</a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
