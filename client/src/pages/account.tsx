import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import {useState, useEffect} from 'react'
import Head from 'next/head'

const Account: React.FC = () => {
    const [email, setEmail] = useState('loading...');

    useEffect( () => {
        const getEmail = async () => {
            const response = await fetch('/api/login');
            const data = await response.json();
            console.log(response.status)
            if(response.status!=200){
                window.location.href="/login";
            } else {
                setEmail(JSON.stringify(data))
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
                <div>
                    Currently logged in as {email}
                </div>
                <a href="/api/login/logout">
                    Logout
                </a>
            </main>
            <Footer />
        </div>
    )
}

export default Account;