import Footer from "@components/Footer/Footer";
import Navbar from "@components/Navbar/Navbar";
import Submit from "@components/Submit/Submit";
import YourQuotes from "@components/YourQuotes/YourQuotes";
import styles from "@styles/Account.module.scss";
import Head from "next/head";
import { useEffect, useState } from "react";

const Account: React.FC = () => {
  const [email, setEmail] = useState("loading...");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const getEmail = async () => {
      const response = await fetch("/api/login");
      const data = await response.json();
      if (response.status != 200) {
        window.location.href = "/login";
      } else {
        setEmail(data);
        setIsLoggedIn(true);
      }
    };
    getEmail();
  }, []);

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const [showYourQuotes, setShowYourQuotes] = useState(true);
  const refetchQuotes = async () => {
    setShowYourQuotes(false);
    await timeout(10);
    setShowYourQuotes(true);
  };

  return (
    <div>
      <Head>
        <title>My Account | Inspiration Jar</title>
      </Head>
      <main>
        <Navbar />
        <h1>My Account</h1>
        {isLoggedIn ? (
          <>
            <div className={styles.loggedInText}>
              Currently logged in as {email}
            </div>
            <a className={styles.logoutContainer} href="/api/login/logout">
              <img className={styles.logoutImg} src="img/logout.svg"></img>
              <div className={styles.logoutText}>Logout</div>
            </a>
            <Submit refetchCallback={refetchQuotes} />
            {showYourQuotes && <YourQuotes email={email} />}
          </>
        ) : (
          "Loading..."
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Account;
