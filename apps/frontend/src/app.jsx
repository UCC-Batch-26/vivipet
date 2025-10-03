import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';

import { Home } from '@/modules/home/pages/home';
import { Pet } from '@/modules/pet/pages/pet';
import { About } from '@/modules/about/pages/about';
import { SignUp } from '@/modules/home/pages/sign-up';
import { LoginPage } from '@/modules/home/pages/log-in';
import styles from './index.module.css';
import { IMAGES } from '@/assets/images';

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user) => {
    setLoggedInUser(user);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    navigate(`/pet/${user._id}/activity`);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.navbar}>
        <img src={IMAGES.gpLogo} alt="Logo" className={styles.logo} />
        <nav>
          <NavLink to="/" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}>
            Home
          </NavLink>

          <NavLink
            to={loggedInUser ? `/pet/${loggedInUser._id}/activity` : '/login'}
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
          >
            My Pet
          </NavLink>
          {/* 
          <NavLink to="/about" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}>
            About
          </NavLink> */}

          {loggedInUser && (
            <NavLink
              to="/login"
              onClick={handleLogout}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
            >
              Logout
            </NavLink>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home loggedInUser={loggedInUser} />} />

          <Route path="/pet/:userId/activity" element={loggedInUser ? <Pet /> : <Navigate to="/login" replace />} />

          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
          <Route path="/login" element={<LoginPage petBanners={IMAGES.petBanners} onLogin={handleLogin} />} />
        </Routes>
      </main>
    </div>
  );
}
