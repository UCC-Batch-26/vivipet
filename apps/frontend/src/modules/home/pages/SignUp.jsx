import { useState } from 'react';
import styles from './SignUp.module.css';
import { IMAGES } from '@/assets/images';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [petname, setPetname] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);

  const petBanners = {
    dog: IMAGES.dogSignUp,
    cat: IMAGES.catSignUp,
    bunny: IMAGES.bunnySignUp,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Username:', username);
    console.log('Pet Name:', petname);
    console.log('Selected Pet:', selectedPet);
  };

  return (
    <div className={styles.signContainer}>
      <div className={styles.headerContainer}>
        <img
          src={selectedPet ? petBanners[selectedPet] : IMAGES.catSignUp}
          alt="Sign up banner"
          className={styles.catSignUp}
        />

        <div className={styles.signUpContainer}>
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
              <button
                type="button"
                className={`${styles.petBtn} ${selectedPet === 'dog' ? styles.activePet : ''}`}
                onClick={() => setSelectedPet('dog')}
              >
                <img src={IMAGES.dog2Head} alt="Dog" />
              </button>

              <button
                type="button"
                className={`${styles.petBtn} ${selectedPet === 'cat' ? styles.activePet : ''}`}
                onClick={() => setSelectedPet('cat')}
              >
                <img src={IMAGES.catHead} alt="Cat" />
              </button>

              <button
                type="button"
                className={`${styles.petBtn} ${selectedPet === 'bunny' ? styles.activePet : ''}`}
                onClick={() => setSelectedPet('bunny')}
              >
                <img src={IMAGES.bunnyHead} alt="Bunny" />
              </button>
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>

      <p className={styles.signParag}>It only takes a minute to join your new companion!</p>
    </div>
  );
}
