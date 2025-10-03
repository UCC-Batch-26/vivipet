import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { PetSprite } from '@/modules/pet/components/pet-sprite';
import { PetActions } from '@/modules/pet/components/pet-actions';
import styles from '@/modules/pet/pages/pet.module.css';
import { IMAGES } from '@/assets/images';
import { fetchPet, petAction } from '../services/pet-service';

export function Pet() {
  const { userId } = useParams();
  const [pet, setPet] = useState(null);
  const [action, setAction] = useState('idle');
  const [mood, setMood] = useState('calm');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPet = useCallback(async () => {
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
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) loadPet();

    const interval = setInterval(loadPet, 3000);
    return () => clearInterval(interval);
  }, [userId, loadPet]);

  const handleAction = async (activity) => {
    try {
      await petAction(activity, userId, setPet, setAction, setMood);
      await loadPet();
    } catch (err) {
      console.error('Action failed:', err);
      setError(err.message || 'Action failed');
    }
  };

  if (loading) return <p>Loading pet...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.petContainer}>
      <div className={styles.petBgWrapper}>
        <img src={IMAGES.petBg} alt="wooden background" className={styles.petBg} />
        <div className={styles.petCopy}>
          <PetSprite type={pet.type} activity={action} mood={mood} />
        </div>
      </div>

      <div className={styles.petActionsWrapper}>
        <PetActions onHandleAction={handleAction} />
      </div>
    </div>
  );
}
