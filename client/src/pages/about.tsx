import AboutStory from "@components/AboutStory/AboutStory";
import Footer from "@components/Footer/Footer";
import Navbar from "@components/Navbar/Navbar";
import Head from "next/head";

const About: React.FC = () => {
  return (
    <div>
      <Head>
        <title>About | Inspiration Jar</title>
      </Head>
      <main>
        <Navbar />
        <AboutStory />
      </main>
      <Footer />
    </div>
  );
};
export default About;
