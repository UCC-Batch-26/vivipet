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
  const [mood, setMood] = useState('happy');
  const [initialLoading, setInitialLoading] = useState(true);
  const [moodBanner, setMoodBanner] = useState('');
  const [actionBtn, setActionBtn] = useState(false);

  const loadPet = async () => {
    try {
      const data = await fetchPet(userId);
      if (data) {
        setPet(data);
        setAction(data.activity);
        setMood(data.mood);
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
      if (userId) loadPet();
    }, 8000);

    return () => clearInterval(interval);
  }, [userId]);

  const handleAction = async (activity) => {
    if (actionBtn) return;
    setActionBtn(true);
    try {
      await petAction(activity, userId, setPet, setAction, setMood);

      setTimeout(async () => {
        await loadPet();
        setActionBtn(false);
      }, 5000);
    } catch (err) {
      setMoodBanner(err.message);
      console.error('Action error:', err);
      setActionBtn(false);
    }
  };

  // const getMoodBanner = () => {
  //   if (!pet) return '';
  //   if (pet.hungry >= 80 && pet.dirty >= 80) return '😢 Sad';
  //   if (pet.hungry >= 80) return '😋 Hungry';
  //   if (pet.dirty >= 80) return '🛁 Dirty';
  //   if (pet.mood === 'happy' && pet.hungry < 80 && pet.dirty < 80) return '😊 Happy';
  //   return '';
  // };

  useEffect(() => {
    if (!pet) return;

    const timeout = setTimeout(() => {
      let newMood = '';
      if (pet.hungry >= 80 && pet.dirty >= 80) {
        newMood = '😢 Sad';
      } else if (pet.hungry >= 80) {
        newMood = '😋 Hungry';
      } else if (pet.dirty >= 80) {
        newMood = '🛁 Dirty';
      } else if (pet.mood === 'happy' && pet.hungry < 80 && pet.dirty < 80) {
        newMood = '😊 Happy';
      }

      if (newMood !== moodBanner) {
        setMoodBanner(newMood);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [pet]);

  if (initialLoading) return <LoadingSprite />;
  if (!pet) return <p>Pet not found.</p>;

  return (
    <div className={styles.petContainer}>
      <div className={styles.petBgWrapper}>
        <img src={IMAGES.petBg} alt="wooden background" className={styles.petBg} />
        <div className={styles.petMoodBanner}>{moodBanner}</div>
        <div className={styles.petCopy}>
          <PetSprite type={pet.type} activity={action} mood={mood} />
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
