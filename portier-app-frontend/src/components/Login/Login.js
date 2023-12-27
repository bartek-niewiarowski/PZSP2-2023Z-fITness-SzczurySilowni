// LoginComponent.js
import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = ({ isVisible, onClose }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleClose = () => {
    onClose();
  };

  const handleLogin = () => {
    // Tutaj umieść logikę do sprawdzania poprawności loginu i hasła
    // np. poprzez wywołanie odpowiedniej funkcji lub API
    setMessage('Invalid login or password');
  };

  return (
    <div className={isVisible ? styles.loginContainer : styles.hidden}>
      <div className={styles.loginBox}>
        <span className={styles.closeButton} onClick={handleClose}>
          &times;
        </span>
        <p className = {styles.title}>Zaloguj się</p>
        <div className={styles.formContainer}>
          <label className={styles.label} htmlFor="username">Login:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className={styles.label} htmlFor="password">Hasło:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.button} onClick={handleLogin}>Zaloguj</button>
          <p className={styles.info}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
