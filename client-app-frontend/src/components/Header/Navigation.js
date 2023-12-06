import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Navigation.module.css'; // Import your CSS file

function Navigation() {
  return (
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
          <li className={styles.listItem}>
            <Link to='/FAQ'>Logowanie</Link>
          </li>
          <li className={styles.listItem}>
            <Link to='/FAQ'>Rejestracja</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;