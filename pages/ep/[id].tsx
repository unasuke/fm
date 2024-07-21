import { EpisodeData } from "../../interfaces";
import Hero from "../../components/Hero";
import styles from "./[id].module.css";
import { getEpisodeData } from "../../lib/api";
import Link from "next/link";
import { GetStaticProps } from "next";
import Footer from "../../components/Footer";
import Head from "next/head";
import Image from "next/image";

function Episode({ episode }) {
  return (
    <>
      <Head>
        <title>{`ep${episode.id} "${episode.title}" - unasuke.fm`}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.gutter}>
          <Link href="/" legacyBehavior>
            <Hero />
          </Link>
          <div className={styles.wrapper}>
            <section className={styles.episode}>
              <article className={styles.entry}>
                <section className={styles.header}>
                  <div>{getFormattedDate(new Date(episode.date))}</div>
                  <div className={styles.id}>#{episode.id}</div>
                </section>
                <h1 className={styles.title}>{episode.title}</h1>
                <ul className={styles.guests}>
                  {episode.guests.map((guest, index) => (
                    <li key={index} className={styles.guest}>
                      <a href={`https://twitter.com/${guest.twitter}`}>
                        <Image
                          src={`https://unavatar.io/github/${guest.github}`}
                          className={styles.avatar}
                          alt={guest.twitter}
                          width={42}
                          height={42}
                        />
                        <span className={styles.name}>@{guest.twitter}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p>{episode.description}</p>
                {episode.transcription != null ? (
                  <section className={styles.transcription_section}>
                    <h2 className={styles.transcription}>transcription</h2>
                    <a href={episode.transcription}>{episode.transcription}</a>
                  </section>
                ) : (
                  <></>
                )}
                <audio
                  controls
                  preload={"metadata"}
                  src={episode.url}
                  className={styles.audio}
                />
              </article>
            </section>
            <Link href={"/"}>Back to top</Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

function getFormattedDate(date: Date) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export const getStaticProps: GetStaticProps = async (context) => {
  const episodes: Array<EpisodeData> = getEpisodeData();
  const episode = episodes.find((ep) => ep.id.toString() === context.params.id);

  return {
    props: {
      episode,
    },
  };
};

export async function getStaticPaths() {
  const episodes: Array<EpisodeData> = getEpisodeData();

  const paths = episodes.map((ep) => {
    return { params: { id: ep.id } };
  });

  return { paths, fallback: false };
}

export default Episode;
