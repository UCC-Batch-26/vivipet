import styles from './pet-actions.module.css';
import { IMAGES } from '@/assets/images';

export function PetActions({ onHandleAction }) {
  return (
    <div className={styles.petContainer}>
      <img src={IMAGES.healthBar} alt="health bar" className={styles.healthBar} />
      <div className={styles.petBtnContainer}>
        <button className={styles.petBtn} onClick={() => onHandleAction('feed')} title="Feed your pet">
          <img src={IMAGES.food} alt="Feed" className={styles.petBtnImg} />
        </button>
        <button className={styles.petBtn} onClick={() => onHandleAction('play')} title="Play with your pet">
          <img src={IMAGES.play} alt="Play" className={styles.petBtnImg} />
        </button>
        <button className={styles.petBtn} onClick={() => onHandleAction('shower')} title="Shower your pet">
          <img src={IMAGES.shower} alt="Shower" className={styles.petBtnImg} />
        </button>
      </div>
    </div>
  );
}
