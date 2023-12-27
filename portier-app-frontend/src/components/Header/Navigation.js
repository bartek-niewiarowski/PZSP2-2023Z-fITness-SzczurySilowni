import React from 'react';
import { useState } from 'react';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';

import styles from './Navigation.module.css'; // Import your CSS file

function Navigation({items}) {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const handleLoginClick = () => {
    setIsLoginVisible(true);
  };

  const handleLoginClose = () => {
    setIsLoginVisible(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterVisible(true);
  };

  const handleRegisterClose = () => {
    setIsRegisterVisible(false);
  };
  return (
      <nav>
        <ul className={styles.list}>
          <a href="#" onClick={handleLoginClick} className={styles.listItem}>
            Logowanie
          </a>
          <Login isVisible ={isLoginVisible} onClose={handleLoginClose} />
          <a href="#" onClick={handleRegisterClick} className={styles.listItem}>
            Rejestracja
          </a>
          <Register isVisible ={isRegisterVisible} onClose={handleRegisterClose} />
        </ul>
      </nav>
  );
}

export default Navigation;
