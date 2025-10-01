import { useState, useEffect } from 'react';
import { IMAGES } from '@/assets/images';
import styles from './pet-sprite.module.css';

export function PetSprite({ type = 'dog', activity = 'idle', mood = 'calm', speed = 900 }) {
  const [frame, setFrame] = useState(0);

  const petFrames = {
    dog: {
      walking: [IMAGES.dogWalkingGif],
      hungry: [IMAGES.hungryDog],
      dirty: [IMAGES.dirtyDog],
      // sad: [IMAGES.dogSad1, IMAGES.dogSad2, IMAGES.dogSad3],
      // playing: [IMAGES.dogPlaying],
      feedAction: [IMAGES.eatingDog],
      showerAction: [IMAGES.dogShower],
      playAction: [IMAGES.dogPlaying],
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

  const moodMap = {
    calm: 'walking',
    happy: 'walking',
    hungry: 'hungry',
    dirty: 'dirty',
    sad: 'sad',
  };

  const actionMap = {
    feed: 'feedAction',
    play: 'playAction',
    shower: 'showerAction',
  };

  const key = activity === 'idle' ? moodMap[mood] || 'walking' : actionMap[activity] || 'walking';

  const frames = petFrames[type]?.[key] || petFrames[type]?.walking;

  console.log({ activity, mood, key, frames });

  useEffect(() => {
    if (!frames || frames.length === 1) return;

    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, speed);

    return () => clearInterval(interval);
  }, [frames, speed]);

  return (
    <div className={styles.petSprite}>
      {frames && <img src={frames[frame]} alt={`${type}`} className={styles.spriteImage} />}
      {/* <p>Mood: {mood}</p>
       <p>Activity: {activity}</p> */}
    </div>
  );
}
