import styles from "./PetActions.module.css";
import { IMAGES } from "@/assets/images";

export default function PetActions({ handleAction }) {
  return (
    <div className={styles.petBtnContainer}>
      <button
        className={styles.petBtn}
        onClick={() => handleAction("feed")}
        title="Feed your pet"
      >
        <img src={IMAGES.food} alt="Feed" className={styles.petBtnImg} />
      </button>

      <button
        className={styles.petBtn}
        onClick={() => handleAction("play")}
        title="Play with your pet"
      >
        <img src={IMAGES.play} alt="Play" className={styles.petBtnImg} />
      </button>

      <button
        className={styles.petBtn}
        onClick={() => handleAction("shower")}
        title="Shower your pet"
      >
        <img src={IMAGES.shower} alt="Shower" className={styles.petBtnImg} />
      </button>
    </div>
  );
}
