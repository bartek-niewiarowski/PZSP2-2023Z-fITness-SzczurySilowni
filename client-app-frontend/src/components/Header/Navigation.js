import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Login from '../Login/Login.js';
import Regsiter from '../Register/Register.js';

import styles from './Navigation.module.css'; // Import your CSS file

function Navigation() {
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
          <li className={styles.listItem}>
            <Link className={styles.link} to='/galery' >Nasze kluby</Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.link} to='/aboutUs'>O Nas</Link>
          </li>
          <li className={styles.listItem}>
            <Link className={styles.link} to='/MyAccount'>Moje Konto</Link>
          </li>
          <a href="#" onClick={handleLoginClick} className={styles.listItem}>
            Logowanie
          </a>
          <Login isVisible ={isLoginVisible} onClose={handleLoginClose} />
          <a href="#" onClick={handleRegisterClick} className={styles.listItem}>
            Rejestracja
          </a>
          <Regsiter isVisible ={isRegisterVisible} onClose={handleRegisterClose} />
        </ul>
      </nav>
  );
}

export default Navigation;