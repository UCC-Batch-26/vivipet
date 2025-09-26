import { useState, useEffect } from 'react';
import { IMAGES } from '@/assets/images';
import styles from './PetSprite.module.css';

export default function PetMoodDisplay({ mood, speed = 500 }) {
  const [frame, setFrame] = useState(0);

  const moodFrames = {
    hungry: [IMAGES.dogHungry1, IMAGES.dogHungry2, IMAGES.dogHungry3],
    dirty: [IMAGES.dogDirty1, IMAGES.dogDirty2, IMAGES.dogDirty3],
    sad: [IMAGES.dogSad1, IMAGES.dogSad2, IMAGES.dogSad3],
    playing: [IMAGES.dogPlay1, IMAGES.dogPlay2, IMAGES.dogPlay3],
  };

  const frames = moodFrames[mood] || [IMAGES.dogFrame1];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, speed);
    return () => clearInterval(interval);
  }, [mood, frames.length, speed]);

  return (
    <div className={styles.petSprite}>
      <img src={frames[frame]} alt={mood} className={styles.spriteImage} />
      <p>Current Mood: {mood}</p>
    </div>
  );
}
