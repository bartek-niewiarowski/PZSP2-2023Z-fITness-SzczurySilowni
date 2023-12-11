import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Login from '../Login/Login.js';

import styles from './Navigation.module.css'; // Import your CSS file

function Navigation() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const handleLoginClick = () => {
    console.log("acb");
    setIsLoginVisible(true);
  };

  const handleLoginClose = () => {
    setIsLoginVisible(false);
  };
  return (
    <div>
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link to='/galery'>Nasze kluby</Link>
          </li>
          <li className={styles.listItem}>
            <Link to='/aboutUs'>O Nas</Link>
          </li>
          <li className={styles.listItem}>
            <Link to='/contact'>Kontakt</Link>
          </li>
          <a href="#" onClick={handleLoginClick} className={styles.listItem}>
            Logowanie
          </a>
          <Login isVisible ={isLoginVisible} onClose={handleLoginClose} />
          <li className={styles.listItem}>
            <Link to='/FAQ'>Rejestracja</Link>
          </li>
        </ul>
      </nav>
    </header>
    <Login isVisible={isLoginVisible} onClose={handleLoginClose} />
    </div>
  );
}

export default Navigation;