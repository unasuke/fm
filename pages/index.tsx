import Head from "next/head";
import EpisodeList from "../components/EpisodeList";
import { EpisodeData } from "../interfaces";
import Hero from "../components/Hero";
import { getEpisodeData } from "../lib/api";
import { GetStaticProps } from "next";
import Footer from "../components/Footer";
import styles from "./index.module.css";

function Index({ episodes }) {
  return (
    <>
      <Head>
        <title>unasuke.fm</title>
        <meta property="og:title" content="unasuke.fm" />
        <meta property="og:url" content="https://unasuke.fm" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://unasuke.fm/artwork.png" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:creator" content="@yu_suke1994" />
        <meta
          property="twitter:image"
          content="https://unasuke.fm/artwork.png"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.gutter}>
          <Hero />
          <EpisodeList episodes={episodes} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const episodes: Array<EpisodeData> = getEpisodeData();

  return {
    props: {
      episodes,
    },
  };
};

export default Index;
