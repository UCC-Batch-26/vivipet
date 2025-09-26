import { useState, useEffect } from 'react';
import { IMAGES } from '@/assets/images';
import styles from './pet-sprite.module.css';

export function PetSprite({ mood, speed = 900 }) {
  const [frame, setFrame] = useState(0);

  const walkingFrames = [
    IMAGES.dogFrame1,
    IMAGES.dogFrame2,
    IMAGES.dogFrame3,
    IMAGES.dogFrame4,
    IMAGES.dogFrame5,
    IMAGES.dogFrame6,
  ];

  const moodFrames = {
    hungry: [IMAGES.dogHungry1, IMAGES.dogHungry2, IMAGES.dogHungry3],
    dirty: [IMAGES.dogDirty1, IMAGES.dogDirty2, IMAGES.dogDirty3],
    sad: [IMAGES.dogSad1, IMAGES.dogSad2, IMAGES.dogSad3],
    playing: [IMAGES.dogPlay1, IMAGES.dogPlay2, IMAGES.dogPlay3],
    feedAction: [IMAGES.dogFeed1, IMAGES.dogFeed2, IMAGES.dogFeed3],
    showerAction: [IMAGES.dogShower1, IMAGES.dogShower2, IMAGES.dogShower3],
    playAction: [IMAGES.dogPlayAction1, IMAGES.dogPlayAction2, IMAGES.dogPlayAction3],
  };

  const frames = moodFrames[mood] || walkingFrames;

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, speed);
    return () => clearInterval(interval);
  }, [frames, speed]);

  return (
    <div className={styles.petSprite}>
      <img src={frames[frame]} alt={mood} className={styles.spriteImage} />
      {/* <p>Current Mood: {mood}</p> */}
    </div>
  );
}
