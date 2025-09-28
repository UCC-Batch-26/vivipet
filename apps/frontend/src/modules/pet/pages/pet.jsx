import { useState, useEffect } from 'react';
import { PetSprite } from '@/modules/pet/components/pet-sprite';
import { PetActions } from '@/modules/pet/components/pet-actions';
import { getScheduledMood } from '@/modules/pet/utils/mood-manager';
import styles from '@/modules/pet/pages/pet.module.css';
import { IMAGES } from '@/assets/images';

export function Pet() {
  const [mood, setMood] = useState('walking');
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!manualOverride) {
        const scheduledMood = getScheduledMood();
        setMood(scheduledMood);
      }
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, [manualOverride]);

  const onHandleAction = (action) => {
    let actionMood = 'walking';

    if (action === 'feed') actionMood = 'feedAction';
    if (action === 'play') actionMood = 'playAction';
    if (action === 'shower') actionMood = 'showerAction';

    setMood(actionMood);
    setManualOverride(true);

    setTimeout(() => {
      setMood('walking');
      setManualOverride(false);
    }, 5000);
  };

  return (
    <div className={styles.petContainer}>
      {/* Background with centered pet */}
      <div className={styles.petBgWrapper}>
        <img src={IMAGES.petBg} alt="wooden background" className={styles.petBg} />
        <div className={styles.petCopy}>
          <PetSprite mood={mood} />
        </div>
      </div>

      {/* Actions BELOW background */}
      <div className={styles.petActionsWrapper}>
        <PetActions onHandleAction={onHandleAction} />
      </div>
    </div>
  );
}
