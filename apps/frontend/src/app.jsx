import React, { useState } from 'react';
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';

import { Home } from '@/modules/home/pages/home';
import { Pet } from '@/modules/pet/pages/pet';
import { About } from '@/modules/about/pages/about';
import { SignUp } from '@/modules/home/pages/sign-up';
import { LoginPage } from '@/modules/home/pages/log-in';
import styles from './index.module.css';
import { IMAGES } from '@/assets/images';

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null); // Tracks login status
  const navigate = useNavigate();

  return (
    <div className={styles.appContainer}>
      <header className={styles.navbar}>
        <img src={IMAGES.gpLogo} alt="Logo" className={styles.logo} />
        <nav>
          <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}>
            Home
          </NavLink>

          <NavLink to="/pet" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}>
            My Pet
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}>
            About
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Protect Pet route: redirect to login if not logged in */}
          <Route path="/pet/:userId/activity" element={loggedInUser ? <Pet /> : <Navigate to="/login" replace />} />

          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Login page passes onLogin callback */}
          <Route
            path="/login"
            element={
              <LoginPage
                petBanners={IMAGES.petBanners}
                onLogin={(user) => {
                  setLoggedInUser(user);
                  navigate(`/pet/${user._id}/activity`); // automatically go to Pet page after login
                }}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}
