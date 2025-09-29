import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PetSprite } from '@/modules/pet/components/pet-sprite';
import { PetActions } from '@/modules/pet/components/pet-actions';
import { getScheduledMood } from '@/modules/pet/utils/mood-manager';
import styles from '@/modules/pet/pages/pet.module.css';
import { IMAGES } from '@/assets/images';

export function Pet() {
  const location = useLocation();
  const { selectedPet } = location.state || { selectedPet: 'dog' };
  const [mood, setMood] = useState(null);
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!manualOverride) {
        const scheduledMood = getScheduledMood();
        setMood(scheduledMood || null);
      }
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, [manualOverride]);

  const onHandleAction = (action) => {
    let actionMood = null;

    if (action === 'feed') actionMood = 'feedAction';
    if (action === 'play') actionMood = 'playAction';
    if (action === 'shower') actionMood = 'showerAction';

    if (!actionMood) return;

    setMood(actionMood);
    setManualOverride(true);

    setTimeout(() => {
      setMood(null);
      setManualOverride(false);
    }, 10000);
  };

  return (
    <div className={styles.petContainer}>
      <div className={styles.petBgWrapper}>
        <img src={IMAGES.petBg} alt="wooden background" className={styles.petBg} />
        <div className={styles.petCopy}>
          <PetSprite petType={selectedPet} mood={mood} />
        </div>
      </div>

      <div className={styles.petActionsWrapper}>
        <PetActions onHandleAction={onHandleAction} />
      </div>
    </div>
  );
}
