import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store/index';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <title>Shoe Depot</title>
          <meta name='description' content='The one stop shop for all your shoe needs.'/>
          <meta 
          name='viewport'
          content='initial-scale=1.0, width=device-width'
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
