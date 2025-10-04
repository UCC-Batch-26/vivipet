import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PetSprite } from '@/modules/pet/components/pet-sprite';
import { PetActions } from '@/modules/pet/components/pet-actions';
import { IMAGES } from '@/assets/images';
import styles from '@/modules/pet/pages/pet-style.module.css';
import { fetchPet, petAction } from '../services/pet-service';
import { LoadingSprite } from '@/modules/pet/components/loading-sprite';

export function Pet() {
  const { userId } = useParams();
  const [pet, setPet] = useState(null);
  const [action, setAction] = useState('idle');
  const [actionBtn, setActionBtn] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const moodDisplayMap = {
    happy: 'Happy',
    hungry: 'Hungry',
    dirty: 'Dirty',
    sad: 'Sad',
    calm: 'Calm',
  };

  const loadPet = async () => {
    try {
      const data = await fetchPet(userId);
      if (data) {
        setPet(data);
        setAction(data.activity);
      }
    } catch (err) {
      console.error('Failed to fetch pet:', err);
    }
  };

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      setInitialLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await loadPet();
      setInitialLoading(false);
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    loadPet();
    const interval = setInterval(() => {
      loadPet();
    }, 8000);

    return () => clearInterval(interval);
  }, [userId]);

  const handleAction = async (activity) => {
    if (actionBtn) return;
    setActionBtn(true);
    try {
      await petAction(activity, userId, setPet, setAction);

      setTimeout(async () => {
        await loadPet();
        setActionBtn(false);
      }, 5000);
    } catch (err) {
      console.error('Action error:', err);
      setActionBtn(false);
    }
  };

  if (initialLoading) return <LoadingSprite />;
  if (!pet) return <p>Pet not found.</p>;

  return (
    <div className={styles.petContainer}>
      <div className={styles.petBgWrapper}>
        <img src={IMAGES.petBg} alt="wooden background" className={styles.petBg} />
        <div className={styles.petMoodBanner}>{pet.mood ? moodDisplayMap[pet.mood] || pet.mood : ''}</div>
        <div className={styles.petCopy}>
          <PetSprite type={pet.type} activity={action} mood={pet.mood} />
        </div>
        <div className={styles.placeholderContainer}>
          <div className={styles.placeholderWrapper}>
            <img src={IMAGES.placeholder} alt="wooden sign" className={styles.placeholder} />
            <span className={styles.placeholderText}>{pet?.owner?.username || 'Player'}</span>
          </div>
          <div className={styles.placeholderWrapper}>
            <img src={IMAGES.placeholder} alt="wooden sign" className={styles.placeholder} />
            <span className={styles.placeholderText}>{pet?.name || 'Pet Name'}</span>
          </div>
        </div>
        <div className={styles.petActionsWrapper}>
          <PetActions onHandleAction={handleAction} btnDisabled={actionBtn} />
        </div>
      </div>
    </div>
  );
}
