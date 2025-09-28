import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import containerStyles from './sign-up.module.css';
import { IMAGES } from '@/assets/images';
import bunnyVideo from '@/assets/videos/bunnyGif.gif';
import catGif from '@/assets/videos/catGif.gif';
import dogGif from '@/assets/videos/dogGif.gif';
import { SignUpForm } from './sign-up-form';
import { LoginForm } from './log-in-form';
import { WelcomeScreen } from './welcome-screen';
import { signUp, login } from '../services/user-service';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !petname || !selectedPet) {
      alert('Please fill all fields and choose a pet!');
      return;
    }

    try {
      await signUp(username, petname, selectedPet);
      setIsSignedUp(true);
    } catch (error) {
      alert(error.message);
      console.log('error', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username) {
      alert('Please enter your username!');
      return;
    }

    try {
      await login(username);

      navigate('/pet');
    } catch (error) {
      alert(error.message);
      console.log('error', error);
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
