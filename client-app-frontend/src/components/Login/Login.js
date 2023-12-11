// LoginComponent.js
import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = ({ isVisible, onClose }) => {

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={isVisible ? styles.loginContainer : styles.hidden}>
      <div className={styles.loginBox}>
        <span className={styles.closeButton} onClick={handleClose}>
          &times;
        </span>
        <h2>Logowanie</h2>
        {/* Dodaj tutaj formularz logowania lub inne elementy */}
      </div>
    </div>
  );
};

export default Login;