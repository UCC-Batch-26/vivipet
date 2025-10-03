import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { PetSprite } from '@/modules/pet/components/pet-sprite';
import { PetActions } from '@/modules/pet/components/pet-actions';
// import { getScheduledMood } from '@/modules/pet/utils/mood-manager';
import styles from '@/modules/pet/pages/pet.module.css';
import { IMAGES } from '@/assets/images';
import { useParams } from 'react-router-dom';
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
        {/* <p>Pet name: {pet.name}</p>
        <p>username: {pet.owner.username}</p> */}
      </div>

      <div className={styles.petActionsWrapper}>
        <PetActions onHandleAction={handleAction} />
      </div>
    </div>
  );

  // const location = useLocation();
  // const { selectedPet } = location.state || { selectedPet: 'dog' };
  // const [mood, setMood] = useState(null);
  // const [manualOverride, setManualOverride] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!manualOverride) {
  //       const scheduledMood = getScheduledMood();
  //       setMood(scheduledMood || null);
  //     }
  //   }, 1000 * 60);
  //   return () => clearInterval(interval);
  // }, [manualOverride]);

  // const onHandleAction = (action) => {
  //   let actionMood = null;

  //   if (action === 'feed') actionMood = 'feedAction';
  //   if (action === 'play') actionMood = 'playAction';
  //   if (action === 'shower') actionMood = 'showerAction';

  //   if (!actionMood) return;

  //   setMood(actionMood);
  //   setManualOverride(true);

  //   setTimeout(() => {
  //     setMood(null);
  //     setManualOverride(false);
  //   }, 10000);
  // };

  // return (
  //   <div className={styles.petContainer}>
  //     <div className={styles.petBgWrapper}>
  //       <img src={IMAGES.petBg} alt="wooden background" className={styles.petBg} />
  //       <div className={styles.petCopy}>
  //         <PetSprite petType={selectedPet} mood={mood} />
  //       </div>
  //     </div>

  //     <div className={styles.petActionsWrapper}>
  //       <PetActions onHandleAction={onHandleAction} />
  //     </div>
  //   </div>
  // );
}
