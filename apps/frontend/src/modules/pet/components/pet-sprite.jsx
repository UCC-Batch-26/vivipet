import { useState, useEffect } from 'react';
import { IMAGES } from '@/assets/images';
import styles from './pet-sprite.module.css';

export function PetSprite({ petType = 'dog', mood = 'walking', speed = 900 }) {
  const [frame, setFrame] = useState(0);

  const petFrames = {
    dog: {
      walking: [IMAGES.dogWalkingGif],
      hungry: [IMAGES.hungryDog],
      dirty: [IMAGES.dirtyDog],
      sad: [IMAGES.dogSad1, IMAGES.dogSad2, IMAGES.dogSad3],
      playing: [IMAGES.dogPlay1, IMAGES.dogPlay2, IMAGES.dogPlay3],
      feedAction: [IMAGES.eatingDog],
      showerAction: [IMAGES.dogShower1, IMAGES.dogShower2, IMAGES.dogShower3],
      playAction: [IMAGES.dogPlayAction1, IMAGES.dogPlayAction2, IMAGES.dogPlayAction3],
    },
    cat: {
      walking: [IMAGES.defaultCatMood],
      hungry: [IMAGES.hungryCat],
      dirty: [IMAGES.dirtyCat],
      sad: [IMAGES.catSad1, IMAGES.catSad2],
      playing: [IMAGES.catPlay1, IMAGES.catPlay2],
      feedAction: [IMAGES.eatingCat],
      showerAction: [IMAGES.catShower],
      playAction: [IMAGES.catPlayAction1, IMAGES.catPlayAction2],
    },
    bunny: {
      walking: [IMAGES.defaultBunnyMood],
      hungry: [IMAGES.hungryBunny],
      dirty: [IMAGES.dirtyBunny],
      sad: [IMAGES.bunnySad1, IMAGES.bunnySad2],
      playing: [IMAGES.bunnyPlay1, IMAGES.bunnyPlay2],
      feedAction: [IMAGES.eatingBunny],
      showerAction: [IMAGES.bunnyShower1, IMAGES.bunnyShower2],
      playAction: [IMAGES.bunnyPlayAction1, IMAGES.bunnyPlayAction2],
    },
  };

  const frames = petFrames[petType]?.[mood] || petFrames[petType]?.walking;

  useEffect(() => {
    if (!frames || frames.length === 1) return;

    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, speed);

    return () => clearInterval(interval);
  }, [frames, speed]);

  return (
    <div className={styles.petSprite}>
      {frames && <img src={frames[frame]} alt={`${petType}`} className={styles.spriteImage} />}
    </div>
  );
}
