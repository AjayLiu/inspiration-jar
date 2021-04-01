import DrawAndBrowse from "@components/DrawAndBrowse/DrawAndBrowse";
import Footer from "@components/Footer/Footer";
import GoogleAnalyticsHook from "@components/GoogleAnalyticsHook";
import LandingPage from "@components/LandingPage/LandingPage";
import Navbar from "@components/Navbar/Navbar";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <>
      <GoogleAnalyticsHook />
      <div className="container">
        <Head>
          <title>Inspiration Jar</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="Description"
            content="Share words of encouragement to fellow humans around the 
          world!"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content="Inspiration Jar" />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://inspirationjar.herokuapp.com/"
          />
          <meta
            property="og:image"
            content="https://inspirationjar.herokuapp.com/img/jar.png"
          />
          <meta
            property="og:description"
            content="Share words of encouragement to fellow humans around the 
          world!"
          />
        </Head>

        <main>
          <Navbar />
          <LandingPage />
          <DrawAndBrowse />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
