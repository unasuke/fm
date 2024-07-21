import "../styles/global.css";
import Head from "next/head";
import { AppProps } from "next/app";

export default function UnasukeFmApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
