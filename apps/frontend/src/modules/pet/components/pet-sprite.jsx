// PetSprite.jsx
import { useState, useEffect } from 'react';
import { IMAGES } from '@/assets/images';
import styles from './pet-sprite.module.css';

export function PetSprite({ mood, speed = 900 }) {
  const [frame, setFrame] = useState(0);

  const moodFrames = {
    walkingFrames: [IMAGES.dogWalkingGif],
    hungry: [IMAGES.hungryDog],
    dirty: [IMAGES.dirtyDog],
    sad: [IMAGES.dogSad1, IMAGES.dogSad2, IMAGES.dogSad3],
    playing: [IMAGES.dogPlay1, IMAGES.dogPlay2, IMAGES.dogPlay3],
    feedAction: [IMAGES.eatingDog],
    showerAction: [IMAGES.dogShower1, IMAGES.dogShower2, IMAGES.dogShower3],
    playAction: [IMAGES.dogPlayAction1, IMAGES.dogPlayAction2, IMAGES.dogPlayAction3],
  };

  const frames = moodFrames[mood] || moodFrames.walkingFrames;

  useEffect(() => {
    if (frames.length === 1) return;

    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, speed);

    return () => clearInterval(interval);
  }, [frames, speed]);

  return (
    <div className={styles.petSprite}>
      <img src={frames[frame]} alt="Pet" className={styles.spriteImage} />
    </div>
  );
}
