import React, {useState} from "react";
import styles from './Register.module.css';

const Regsiter = ({isVisible, onClose}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [message, setMessage] = useState('');
    const handleClose = () => {
        onClose();
    };

    const handleRegister = () => {
        // Tutaj umieść logikę do sprawdzania poprawności loginu i hasła
        // np. poprzez wywołanie odpowiedniej funkcji lub API
        setMessage('abcd');
    };

    return(
        <div className={isVisible ? styles.loginContainer : styles.hidden}>
            <div className={styles.loginBox}>
                <span className={styles.closeButton} onClick={handleClose}>
                    &times;
                </span>
                <h2 className={styles.title}>Zarejestruj się już dziś</h2>
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
                    <label className={styles.label} htmlFor="password">Powtórz Hasło:</label>
                    <input
                        type="password"
                        id="password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                    <button className={styles.button} onClick={handleRegister}>Zarejestruj</button>
                    <p className={styles.info}>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Regsiter;