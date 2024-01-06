// LoginComponent.js
import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = ({ isVisible, onClose }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [User, setUser] = useState(null);
  const handleClose = () => {
    onClose();
  };

  const handleLogin = async () => {
    try {    
      const response = await fetch(`http://localhost:8000/client/user_api?email=${username}&password=${password}`);
      const result = await response.json();
      if (result && result.length > 0) {
        const loggedUser = result[0];
        setUser(loggedUser);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        setMessage('Login completed successfully.');
        setUsername('');
        setPassword('');
      }
      else {
        setMessage('Invalid login or password');
        setPassword('');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    // Tutaj umieść logikę do sprawdzania poprawności loginu i hasła
    // np. poprzez wywołanie odpowiedniej funkcji lub API
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