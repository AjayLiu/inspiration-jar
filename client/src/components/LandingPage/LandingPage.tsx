import styles from "./LandingPage.module.scss";
const LandingPage: React.FC = () => {
  return (
    <div>
      <div>
        <img className={styles.logo} src="img/jar.svg"></img>
        <h1 className={styles.logoTitle}>Inspiration Jar</h1>
        <h2 className={styles.logoSlogan}>
          Share words of encouragement to fellow humans around the world!
        </h2>
      </div>
    </div>
  );
};

export default LandingPage;
