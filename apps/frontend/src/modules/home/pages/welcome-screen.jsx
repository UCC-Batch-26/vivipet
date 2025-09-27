import React from 'react';
import welcomeStyles from './welcome-screen.module.css';
import sharedStyles from './sign-up.module.css';

export function WelcomeScreen({ username, petname, selectedPet, petMedia, handleStart }) {
  return (
    <div className={welcomeStyles.welcomeContainer}>
      <h1 className={sharedStyles.heading2}>Welcome aboard, {username}!</h1>
      <p className={welcomeStyles.welcomeParag}>Let’s make some pawsitive memories together with {petname}.</p>
      {selectedPet && <img src={petMedia[selectedPet]} className={welcomeStyles.bunnyVid} alt={`${selectedPet} GIF`} />}
      <button className={welcomeStyles.startBtn} onClick={handleStart}>
        Start
      </button>
    </div>
  );
}
