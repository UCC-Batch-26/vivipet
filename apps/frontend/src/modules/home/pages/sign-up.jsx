import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import containerStyles from './sign-up.module.css';
import { IMAGES } from '@/assets/images';
import bunnyVideo from '@/assets/videos/bunnyGif.gif';
import catGif from '@/assets/videos/catGif.gif';
import dogGif from '@/assets/videos/dogGif.gif';
import { SignUpForm } from './sign-up-form';
import { LoginForm } from './log-in-form';
import { WelcomeScreen } from './welcome-screen';

export function SignUp() {
  const [username, setUsername] = useState('');
  const [petname, setPetname] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const petBanners = {
    dog: IMAGES.dogSignUp,
    cat: IMAGES.catSignUp,
    bunny: IMAGES.bunnySignUp,
  };

  const petMedia = {
    dog: dogGif,
    cat: catGif,
    bunny: bunnyVideo,
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('petpalUser');
    if (storedUser) {
      const { username, petname, selectedPet } = JSON.parse(storedUser);
      setSelectedPet(selectedPet);
      setPetname(petname);
      setUsername(username);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !petname || !selectedPet) {
      alert('Please fill all fields and choose a pet!');
      return;
    }

    localStorage.setItem('petpalUser', JSON.stringify({ username, petname, selectedPet }));

    setIsSignedUp(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username) {
      alert('Please enter your username!');
      return;
    }

    const storedUser = localStorage.getItem('petpalUser');
    if (storedUser) {
      const { username: savedUser } = JSON.parse(storedUser);
      if (username === savedUser) {
        navigate('/pet');
      } else {
        alert('User not found! Please sign up first.');
      }
    } else {
      alert('No user found! Please sign up first.');
    }
  };

  const handleStart = () => navigate('/pet');

  return (
    <div className={containerStyles.signContainer}>
      {!isSignedUp ? (
        isLogin ? (
          <LoginForm
            username={username}
            setUsername={setUsername}
            selectedPet={selectedPet}
            petBanners={petBanners}
            handleLogin={handleLogin}
          />
        ) : (
          <>
            <SignUpForm
              username={username}
              setUsername={setUsername}
              petname={petname}
              setPetname={setPetname}
              selectedPet={selectedPet}
              setSelectedPet={setSelectedPet}
              petBanners={petBanners}
              handleSubmit={handleSubmit}
            />

            <button className={containerStyles.switchBtn} onClick={() => setIsLogin(true)}>
              Already have an account? Log in
            </button>
          </>
        )
      ) : (
        <WelcomeScreen
          username={username}
          petname={petname}
          selectedPet={selectedPet}
          petMedia={petMedia}
          handleStart={handleStart}
        />
      )}
    </div>
  );
}
