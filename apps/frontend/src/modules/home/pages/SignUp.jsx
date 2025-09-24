import styles from "./SignUp.module.css";
import { IMAGES } from "@/assets/images";

export default function SignUp() {
  return (
    <div className={styles.signContainer}>
      <div className={styles.headerContainer}>
        <img
          src={IMAGES.dogHead}
          alt="Dog head in 3d vox style art"
          className={styles.dogHead}
        />
        <h1 className={styles.heading}>Your Pet Awaits!</h1>        
      </div>

      <form>
        <input type="text" placeholder="Username" />
        {/* <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" /> */}
        <button type="submit">Sign Up</button>
      </form>

      <div className={styles.species}>
        <img
            src={IMAGES.dog2Head}
            alt="Dog head in 3d vox style art"
            className={styles.dog2Head}
        />
        <img
            src={IMAGES.catHead}
            alt="Dog head in 3d vox style art"
            className={styles.catHead}
          />
          <img
            src={IMAGES.bunnyHead}
            alt="Dog head in 3d vox style art"
            className={styles.bunnyHead}
          />
      </div>

      <p>It only takes a minute to join your new companion!</p>
      
    </div>
  );
}
