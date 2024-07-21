import styles from "./Hero.module.css";
import Image from "next/image";
import LogoImage from "../public/logo.svg";

export default function Hero() {
  return (
    <>
      <h1 className={styles.hero}>
        <Image src={LogoImage} alt="unasuke.fm" className={styles.logo} />
      </h1>
    </>
  );
}
