import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './sign-up.module.css';
import { IMAGES } from '@/assets/images';
import bunnyVideo from '@/assets/videos/bunnyVid.webm';
import catVideo from '@/assets/videos/catVid.webm';
import dogVideo from '@/assets/videos/dogVid.webm';

export function SignUp() {
  const [username, setUsername] = useState('');
  const [petname, setPetname] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const navigate = useNavigate();

  const petBanners = {
    dog: IMAGES.dogSignUp,
    cat: IMAGES.catSignUp,
    bunny: IMAGES.bunnySignUp,
  };

  const petVideos = {
    dog: dogVideo,
    cat: catVideo,
    bunny: bunnyVideo,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !petname || !selectedPet) {
      alert('Please fill all fields and choose a pet!');
      return;
    }
    setIsSignedUp(true);
  };

  const handleStart = () => navigate('/pet');

  return (
    <div className={styles.signContainer}>
      <div className={styles.headerContainer}>
        {!isSignedUp && (
          <img
            src={selectedPet ? petBanners[selectedPet] : IMAGES.catSignUp}
            alt="Sign up banner"
            className={styles.catSignUp}
          />
        )}

        <div className={styles.signUpContainer}>
          {!isSignedUp ? (
            <>
              <h1 className={styles.heading}>Your Pet Awaits!</h1>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="text"
                  name="petname"
                  placeholder="Pet name"
                  value={petname}
                  onChange={(e) => setPetname(e.target.value)}
                />
                <div className={styles.species}>
                  {['dog', 'cat', 'bunny'].map((pet) => (
                    <button
                      key={pet}
                      type="button"
                      className={`${styles.petBtn} ${selectedPet === pet ? styles.activePet : ''}`}
                      onClick={() => setSelectedPet(pet)}
                    >
                      <img src={IMAGES[`${pet}Head`]} alt={pet} />
                    </button>
                  ))}
                </div>
                <button type="submit">Sign Up</button>
              </form>
            </>
          ) : (
            <>
              <div className={styles.welcomeContainer}>
                <h1 className={styles.heading2}>Welcome aboard, {username}!</h1>
                <p className={styles.welcomeParag}>
                  Your pet is waiting for you — let’s make some pawsitive memories together with {petname}.
                </p>

                <div className={styles.animationPlaceholder}></div>

                {selectedPet && (
                  <video src={petVideos[selectedPet]} className={styles.bunnyVid} autoPlay loop muted playsInline />
                )}

                <button className={styles.startBtn} onClick={handleStart}>
                  Start
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {!isSignedUp && <p className={styles.signParag}>It only takes a minute to join your new companion!</p>}
    </div>
  );
}
