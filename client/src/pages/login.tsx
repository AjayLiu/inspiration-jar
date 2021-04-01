import Footer from "@components/Footer/Footer";
import LoginButton from "@components/LoginButton/LoginButton";
import Navbar from "@components/Navbar/Navbar";
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
        <div style={{ width: "80%", margin: "auto" }}>
          <em>
            By signing in with Google, I won't have to encrypt and store your
            passwords, so be rest assured that your accounts are secure.
          </em>
          <p>
            Your email address will be visible only to admin for moderation
            purposes.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
