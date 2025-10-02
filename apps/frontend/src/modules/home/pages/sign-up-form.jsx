import React from 'react';
import formStyles from './sign-up-form.module.css';
import sharedStyles from './sign-up.module.css';
import { IMAGES } from '@/assets/images';
import { Link } from 'react-router-dom';

export function SignUpForm({
  username,
  setUsername,
  petname,
  setPetname,
  selectedPet,
  setSelectedPet,
  petBanners,
  handleSubmit,
}) {
  return (
    <>
      <h1 className={sharedStyles.heading}>Your Pet Awaits!</h1>

      <p className={formStyles.signParag}>It only takes a minute to join your new companion!</p>

      <div className={formStyles.headerContainer}>
        <img
          src={selectedPet ? petBanners[selectedPet] : IMAGES.dogSignUp}
          alt="Sign up banner"
          className={formStyles.catSignUp}
        />

        <div className={formStyles.signUpContainer}>
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

            <div className={formStyles.species}>
              {['dog', 'cat', 'bunny'].map((pet) => (
                <button
                  key={pet}
                  type="button"
                  className={`${formStyles.petBtn} ${selectedPet === pet ? formStyles.activePet : ''}`}
                  onClick={() => setSelectedPet(pet)}
                >
                  <img src={IMAGES[`${pet}Head`]} alt={pet} />
                </button>
              ))}
            </div>

            <button type="submit">Sign Up</button>
          </form>

          {/* ✅ Add this link back to Login */}
          <Link to="/login" className={sharedStyles.switchBtn}>
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </>
  );
}
