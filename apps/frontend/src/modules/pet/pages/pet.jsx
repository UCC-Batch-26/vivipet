import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PetSprite } from '@/modules/pet/components/pet-sprite';
import { PetActions } from '@/modules/pet/components/pet-actions';
import { IMAGES } from '@/assets/images';
import styles from '@/modules/pet/pages/pet-style.module.css';
import { fetchPet, petAction } from '../services/pet-service';
import { LoadingSprite } from '@/modules/pet/components/loading-sprite'; // <- import your loading sprite

export function Pet() {
  const { userId } = useParams();
  const [pet, setPet] = useState(null);
  const [action, setAction] = useState('idle');
  const [mood, setMood] = useState('calm');
  const [loading, setLoading] = useState(true);

  const loadPet = async () => {
    setLoading(true);
    try {
      // Wait for both fetch and 6-second delay
      const [data] = await Promise.all([fetchPet(userId), new Promise((resolve) => setTimeout(resolve, 6000))]);

      if (data) {
        setPet(data);
        setAction(data.activity);
        setMood(data.mood);
      }
    } catch (err) {
      console.error('Failed to fetch pet:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) loadPet();
  }, [userId]);

  const handleAction = async (activity) => {
    try {
      await petAction(activity, userId, setPet, setAction, setMood);
      await loadPet();
    } catch (err) {
      console.error('Action error:', err);
    }
  };

  const getMoodBanner = () => {
    if (!pet) return '';
    if (pet.hungry >= 80) return '😋 Hungry';
    if (pet.dirty >= 80) return '🛁 Dirty';
    if (pet.mood === 'sad') return '😢 Sad';
    if (pet.mood === 'happy' && pet.hungry < 80 && pet.dirty < 80) return '😊 Happy';
    return '';
  };

  if (loading) return <LoadingSprite />; // <- show your loading sprite

  if (!pet) return <p>Pet not found.</p>;

  return (
    <div className={styles.petContainer}>
      <div className={styles.petBgWrapper}>
        <img src={IMAGES.petBg} alt="wooden background" className={styles.petBg} />

        <div className={styles.petMoodBanner}>{getMoodBanner()}</div>

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
          <PetActions onHandleAction={handleAction} />
        </div>
      </div>
    </div>
  );
}
