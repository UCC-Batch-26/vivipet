import React, { useState } from 'react';
import { LoginForm } from './log-in-form';
import { IMAGES } from '@/assets/images';
import styles from './log-in.module.css';

export function LoginPage({ petBanners, onLogin }) {
  const [username, setUsername] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [selectedPet, setSelectedPet] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username) return;
    onLogin(username);
  };

  return (
    <div className={styles.loginContainer}>
      <LoginForm
        username={username}
        setUsername={setUsername}
        selectedPet={selectedPet}
        petBanners={petBanners}
        handleLogin={handleLogin}
        styles={styles}
      />
    </div>
  );
}
