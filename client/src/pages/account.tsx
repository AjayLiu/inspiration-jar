import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from '@styles/Account.module.css'
import YourQuotes from '@components/account/YourQuotes';

const Account: React.FC = () => {
    const [email, setEmail] = useState('loading...');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect( () => {
        const getEmail = async () => {
            const response = await fetch('/api/login');
            const data = await response.json();
            if(response.status!=200){
                window.location.href="/login";
            } else {
                setEmail(data)
                setIsLoggedIn(true);
            }
        }
        getEmail();
    }, [])

    return (
        <div>
            <Head>
                <title>My Account | Inspiration Jar</title>
            </Head>
            <main>
                <Navbar />
                <h1>My Account</h1>
                {
                    isLoggedIn ?
                    <>
                        <div>
                            Currently logged in as {email}
                        </div>
                        <a className={styles.logoutContainer} href="/api/login/logout">
                            <img className={styles.logoutImg} src="img/logout.svg"></img>
                            <div className={styles.logoutText} >
                                Logout
                            </div>
                        </a>
                        <YourQuotes email={email}/>
                    </>
                    :
                    "Loading..."
                }
            </main>
            <Footer />
        </div>
    )
}

export default Account;