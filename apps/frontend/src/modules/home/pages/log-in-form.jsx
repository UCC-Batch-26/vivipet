import React from 'react';
import { Link } from 'react-router-dom';
import formStyles from './sign-up-form.module.css';
import sharedStyles from './sign-up.module.css';
import { IMAGES } from '@/assets/images';

export function LoginForm({ username, setUsername, selectedPet, petBanners, handleLogin }) {
  return (
    <>
      <h1 className={sharedStyles.heading}>Paws and Relax, You’re Home!</h1>

      <p className={formStyles.signParag}>It’s time to play, cuddle, and care!</p>

      <div className={formStyles.headerContainer}>
        <img
          src={selectedPet ? petBanners[selectedPet] : IMAGES.catSignUp}
          alt="Login banner"
          className={formStyles.catSignUp}
        />

        <div className={formStyles.signUpContainer}>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <button type="submit">Log In</button>
          </form>

          <Link to="/signup" className={sharedStyles.switchBtn}>
            Don’t have an account? Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
