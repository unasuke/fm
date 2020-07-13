import {useRouter} from "next/router";
import { EpisodeData } from "../../interfaces";
import Hero from "../../components/Hero";
import styles from './[id].module.css'
import {getEpisodeData} from "../../lib/api";
import Link from "next/link";

function Episode({ episode }) {
  const router = useRouter()
  const { id }  = router.query

  return <>
    <Hero />
    <div className={styles.wrapper}>
      <section className={styles.episode} >
        <article className={styles.entry}>
          <section className={styles.header}>
            <div>{episode.date}</div>
            <div className={styles.id}>#{episode.id}</div>
          </section>
          <h1 className={styles.title}>{episode.title}</h1>
          <ul className={styles.guests}>{
            episode.guests.map((guest, index) =>(
              <li key={index} className={styles.guest}>
                <a href={`https://twitter.com/${guest.twitter}`} >
                  <img src={`https://unavatar.now.sh/twitter/${guest.twitter}`} className={styles.avatar}/>
                  <span className={styles.name}>@{guest.name}</span>
                </a>
              </li>
            ))
          }</ul>
          <audio controls preload={'metadata'}  src={episode.url} className={styles.audio} />
        </article>
      </section>
      <Link href={'/'} ><a>Back to top</a></Link>
    </div>
  </>
}

export async function getStaticProps(context) {
  const episodes: Array<EpisodeData> = getEpisodeData()
  const episode = episodes.find(ep => ep.id === context.params.id)

  return {
    props: {
      episode
    }
  }
}

export async function getStaticPaths() {
  const episodes: Array<EpisodeData> = getEpisodeData()

  const paths = episodes.map(ep => {
    return { params : { id: ep.id }}
  })

  return {
    paths: paths,
    fallback: false
  }
}

export default Episode