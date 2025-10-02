import { IMAGES } from '@/assets/images';
import styles from './pet-sprite.module.css';

export function PetSprite({ type = 'dog', activity = 'idle', mood = 'calm' }) {
  const petFrames = {
    dog: {
      walking: [IMAGES.dogWalkingGif],
      hungry: [IMAGES.hungryDog],
      dirty: [IMAGES.dirtyDog],
      sad: [IMAGES.sadDog],
      feedAction: [IMAGES.eatingDog],
      showerAction: [IMAGES.dogShower],
      playAction: [IMAGES.dogPlaying],
    },
    cat: {
      walking: [IMAGES.defaultCatMood],
      hungry: [IMAGES.hungryCat],
      dirty: [IMAGES.dirtyCat],
      sad: [IMAGES.sadCat],
      feedAction: [IMAGES.eatingCat],
      showerAction: [IMAGES.catShower],
      playAction: [IMAGES.catPlaying],
    },
    bunny: {
      walking: [IMAGES.defaultBunnyMood],
      hungry: [IMAGES.hungryBunny],
      dirty: [IMAGES.dirtyBunny],
      sad: [IMAGES.sadBunny],
      feedAction: [IMAGES.eatingBunny],
      showerAction: [IMAGES.bunnyShower],
      playAction: [IMAGES.bunnyPlaying],
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

  return (
    <div className={styles.petSprite}>
      {frames && <img src={frames[0]} alt={type} className={styles.spriteImage} />}
    </div>
  );
}
