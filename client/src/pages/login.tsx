import Footer from "@components/Footer";
import LoginButton from "@components/login/LoginButton";
import Navbar from "@components/Navbar";
import Head from "next/head";

const Login: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Login | Inspiration Jar</title>
      </Head>
      <main>
        <Navbar />
        <h1>Login</h1>
        <LoginButton />
        <em>
          By signing in with Google, I won't have to encrypt and store your
          passwords, so be rest assured that your accounts are secure.
        </em>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
