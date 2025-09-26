import styles from './home.module.css';
import { IMAGES } from '@/assets/images';
import characterVideo from '@/assets/videos/character3.webm';
// import planetVideo from "@/assets/videos/planet.webm";
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
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
          {/* <video
            src={planetVideo}
            className={styles.planet}
            autoPlay
            loop
            muted
            playsInline
          /> */}

          <video src={characterVideo} className={styles.rightImg} autoPlay loop muted playsInline />

          <img src={IMAGES.cloud} alt="Cloud" className={styles.cloud} />
        </div>
      </section>

      <img src={IMAGES.planet} alt="Planet" className={styles.planet} />
      <img src={IMAGES.clouds} alt="Transparent clouds" className={styles.clouds} />

      <div className={styles.btnContainer}>
        <button className={styles.btn3d} onClick={() => navigate('/signup')}>
          Sign Up
        </button>
        <button className={styles.btn3d} onClick={() => navigate('/login')}>
          Log In
        </button>
      </div>
    </div>
  );
}


// import { usePing } from '@/modules/home/hooks/use-ping';
// import { useEffect } from 'react';
// import { Link } from 'react-router';

// export function HomePage() {
//   const { ping, status } = usePing();

//   useEffect(() => {
//     ping();
//   }, [ping]);

//   return (
//     <div className="grid gap-2 container mx-auto">
//       <div className="text-4xl text-center">This is the Home Page</div>
//       <div className="text-center">Backend Connection: {status}</div>
//       <Link to="/sample" className="underline mt-10 text-center">
//         Go to Sample Page
//       </Link>
//     </div>
//   );
// }
