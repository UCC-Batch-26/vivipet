import React, { useState } from 'react';
import { LoginForm } from './log-in-form';
import { IMAGES } from '@/assets/images';
import styles from './log-in.module.css';
import { login } from '../services/user-service';

export function LoginPage({ petBanners, onLogin }) {
  const [username, setUsername] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [selectedPet, setSelectedPet] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username) return;

    try {
      const user = await login(username);
      onLogin(user); // App.jsx will now store in state + localStorage
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
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
