import styles from './pet-actions.module.css';
import { IMAGES } from '@/assets/images';

export function PetActions({ onHandleAction, btnDisabled }) {
  return (
    <div className={styles.petContainer}>
      {/* <img src={IMAGES.healthBar} alt="health bar" className={styles.healthBar} /> */}
      <div className={styles.petBtnContainer}>
        <button
          className={styles.petBtn}
          onClick={() => onHandleAction('feed')}
          disabled={btnDisabled}
          title="Feed your pet"
        >
          <img src={IMAGES.food} alt="Feed" className={styles.petBtnImg} />
        </button>
        <button
          className={styles.petBtn}
          onClick={() => onHandleAction('play')}
          disabled={btnDisabled}
          title="Play with your pet"
        >
          <img src={IMAGES.play} alt="Play" className={styles.petBtnImg} />
        </button>
        <button
          className={styles.petBtn}
          onClick={() => onHandleAction('shower')}
          disabled={btnDisabled}
          title="Shower your pet"
        >
          <img src={IMAGES.shower} alt="Shower" className={styles.petBtnImg} />
        </button>
      </div>
    </div>
  );
}
