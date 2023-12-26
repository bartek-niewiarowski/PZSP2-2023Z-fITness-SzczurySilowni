import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contactInfo}>
        <h3>Skontaktuj się z nami</h3>
        <p>Telefon: +48 123 456 789</p>
        <p>Adres: ul. Przykładowa 123, 00-000 Warszawa</p>
        <p>E-mail: fITness@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;