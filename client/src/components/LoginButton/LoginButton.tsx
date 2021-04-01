import styles from "./LoginButton.module.scss";
const LoginButton: React.FC = () => {
  return (
    <div>
      <a href="/api/login/google">
        <img className={styles.image} src="img/google-login.png"></img>
      </a>
    </div>
  );
};

export default LoginButton;
