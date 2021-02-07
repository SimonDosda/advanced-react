import NProgress from 'nprogress';
import { AppProps } from 'next/app';
import { Router } from 'next/router';

import Layout from '../components/Layout';

import '../atoms/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
