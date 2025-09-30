import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ import Link
import containerStyles from './sign-up.module.css';
import { IMAGES } from '@/assets/images';
import bunnyVideo from '@/assets/videos/bunnyGif.gif';
import catGif from '@/assets/videos/catGif.gif';
import dogGif from '@/assets/videos/dogGif.gif';
import { SignUpForm } from './sign-up-form';
import { WelcomeScreen } from './welcome-screen';
import { signUp } from '../services/user-service';

export function SignUp() {
  const [username, setUsername] = useState('');
  const [petname, setPetname] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [userId, setUserId] = useState(null);
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
      const data = await signUp(username, petname, selectedPet);
      setUserId(data);
      setIsSignedUp(true);
    } catch (error) {
      alert(error.message);
      console.log('error', error);
    }
  };

  const handleStart = () => {
    if (userId) {
      navigate(`/pet/${userId}/activity`);
    }
  };

  return (
    <div className={containerStyles.signContainer}>
      {!isSignedUp ? (
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

          {/* ✅ Use Link to navigate to /login */}
          {/* <Link to="/login" className={containerStyles.switchBtn}>
            Already have an account? Log in
          </Link> */}
        </>
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
