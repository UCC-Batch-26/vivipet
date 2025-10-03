import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PetSprite } from '@/modules/pet/components/pet-sprite';
import { PetActions } from '@/modules/pet/components/pet-actions';
import { IMAGES } from '@/assets/images';
import styles from '@/modules/pet/pages/pet.module.css';
import { fetchPet, petAction } from '../services/pet-service';

export function Pet() {
  const { userId } = useParams();
  const [pet, setPet] = useState(null);
  const [action, setAction] = useState('idle');
  const [mood, setMood] = useState('calm');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPet = async () => {
    try {
      const data = await fetchPet(userId);
      if (!data) {
        setError('No pet found');
      } else {
        setPet(data);
        setAction(data.activity);
        setMood(data.mood);
      }
    } catch (err) {
      console.error('Failed to fetch pet:', err);
      setError('Failed to fetch pet');
    }
    setLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (userId) loadPet();
    }, 1000);

    return () => clearInterval(interval);
  }, [userId]);

  const handleAction = async (activity) => {
    try {
      await petAction(activity, userId, setPet, setAction, setMood);
      await loadPet();
    } catch (error) {
      alert(error.message);
      console.error('error', error);
    }
  };

  if (loading) return <p>Loading pet...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.petContainer}>
      <div className={styles.petBgWrapper}>
        <img src={IMAGES.petBg} alt="wooden background" className={styles.petBg} />

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
