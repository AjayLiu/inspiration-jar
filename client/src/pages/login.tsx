import Footer from '@components/Footer'
import LoginButton from "@components/LoginButton"
import Navbar from "@components/Navbar";

const Login: React.FC = () => {
    return (
        <div>
            <main>
                <Navbar />
                <LoginButton />
            </main>
            <Footer />
        </div>
    )
}

export default Login;