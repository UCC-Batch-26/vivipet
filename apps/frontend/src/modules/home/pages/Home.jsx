import styles from "./Home.module.css";
import { IMAGES } from "@/assets/images";
import characterVideo from "@/assets/videos/character3.webm";
// import planetVideo from "@/assets/videos/planet.webm";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.appHeader}>Move in real life,</p>
          <h1>play in virtual life</h1>
        </div>

        <div className={styles.heroImage}>
          {/* <video
            src={planetVideo}
            className={styles.planet}
            autoPlay
            loop
            muted
            playsInline
          /> */}
          
          <video
            src={characterVideo}
            className={styles.rightImg}
            autoPlay
            loop
            muted
            playsInline
          />

          <img
            src={IMAGES.cloud}
            alt="Cloud"
            className={styles.cloud}
          />
        </div>
      </section>

      <img
        src={IMAGES.planet}
        alt="Planet"
        className={styles.planet}
      />
      <img
        src={IMAGES.clouds}
        alt="Transparent clouds"
        className={styles.clouds}
      />

      <p className={styles.introText}>
        Bring your virtual pet to life — <br /> and power its vitality and happiness with your real-world steps, runs, and activity.
      </p>

      <div className={styles.btnContainer}>
        <button
          className={styles.btn3d}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
        <button
          className={styles.btn3d}
          onClick={() => navigate("/login")} 
        >
          Log In
        </button>
      </div>
    </div>
  );
}
