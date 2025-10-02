import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePing } from '@/modules/home/hooks/use-ping';
import styles from './home.module.css';
import { IMAGES } from '@/assets/images';
import characterVideo from '@/assets/videos/character3.webm';

export function Home() {
  const navigate = useNavigate();
  const { ping, status } = usePing();

  useEffect(() => {
    ping();
  }, [ping]);

  return (
    <div className={styles.homeContainer}>
      {status === 'FAILED' && <div className={styles.connectionError}>Unable to connect to server</div>}

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.homeEyebrow}>Move in real life,</p>
          <h1 className={styles.homeHeader}>play in virtual life</h1>
          <p className={styles.homeParag}>
            Bring your virtual pet to life — and power its vitality and happiness with your real-world steps, runs, and
            activity.
          </p>
        </div>

        <div className={styles.heroImage}>
          <video src={characterVideo} className={styles.rightImg} autoPlay loop muted playsInline />
          <img src={IMAGES.cloud} alt="Cloud" className={styles.cloud} />
        </div>
      </section>

      <img src={IMAGES.planet} alt="Planet" className={styles.planet} />
      <img src={IMAGES.clouds} alt="Transparent clouds" className={styles.clouds} />

      <div className={styles.btnContainer}>
        <button className={styles.btn3d} onClick={() => navigate('/signup')}>
          <img src={IMAGES.playBtn} alt="Play Icon" className={styles.btnIcon} />
          Let's Paw-ty
          <div className={styles.emptyBtn}></div>
        </button>
      </div>
    </div>
  );
}
