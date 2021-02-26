import Footer from '@components/Footer'
import LoginButton from "@components/LoginButton"
import Navbar from "@components/Navbar"
import Head from 'next/head'

const Login: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Login | Inspiration Jar</title>
            </Head>
            <main>
                <Navbar />
                <LoginButton />
            </main>
            <Footer />
        </div>
    )
}

export default Login;