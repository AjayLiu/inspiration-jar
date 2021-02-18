import Head from 'next/head'
import Footer from '@components/Footer'
import GoogleAnalyticsHook from '@components/GoogleAnalyticsHook'
import Browse from '@components/Browse'

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
        <meta property="og:url" content="https://inspirationjar.herokuapp.com/" />
        <meta property="og:image" content="https://inspirationjar.herokuapp.com/imgs/logo.png" />
        <meta property="og:description" content="My name is Ajay Liu and I love creating things!" />

      </Head>

      <main>
        <Browse />
      </main>

      <Footer />
    </div>
    </>
  )
}


export default Home;
