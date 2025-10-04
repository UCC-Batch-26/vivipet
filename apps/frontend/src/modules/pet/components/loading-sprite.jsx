import { IMAGES } from '@/assets/images';
import styles from './loading-sprite.module.css';

export function LoadingSprite() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingSprite} style={{ backgroundImage: `url(${IMAGES.loadingSprite})` }} />
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  );
}
