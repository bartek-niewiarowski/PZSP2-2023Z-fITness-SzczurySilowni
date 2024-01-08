import React, {useState} from "react";
import styles from './Register.module.css';
import { v4 as uuidv4 } from 'uuid';

// Komponent implementujacy rejestracje uzytkownika
// Dodanie nowego uzytkownika moze byc realizowane przez Klienta lub Portiera
const Regsiter = ({isVisible, onClose}) => {
    const [rePassword, setRePassword] = useState('');
    const [message, setMessage] = useState('');
    const handleClose = () => {
        onClose();
    };

    // Przygotowuje komponent do nowej rejestracji po zakonczeniu procesu
    const updateUser = () => {
        setUserData({
            user_id: uuidv4(),
            user_name: '',
            email: '',
            password: '',
            access_rights: 'rw',
            name: '',
            second_name: '',
            surname: '',
            gender: '',
            subscription_expiration: '',
            subscription_plan_id: ''
        });
    };
    const [userData, setUserData] = useState({
        user_id: uuidv4(),
        user_name: '',
        email: '',
        password: '',
        access_rights: 'rw',
        name: '',
        second_name: '',
        surname: '',
        gender: '',
        subscription_expiration: null,
        subscription_plan_id: null
      });
    // Modyfikacja danych na podstawie akcji uzytkownika
    const handleInputChange = (e) => {
    setUserData({
        ...userData,
        [e.target.name]: e.target.value,
    });
    };
    // Funkcja realizujaca rejestracje uzytkownika na bazie danych
    const handleRegister = () => {
        userData.user_id = parseInt(userData.user_id, 10);
        if(userData.password != rePassword) {setMessage("Wprowadzone hasła nie są identyczne")}
        else{
        fetch('http://localhost:8000/client/user_api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then(response => response.json())
          .then(data => console.log('Użytkownik zaktualizowany pomyślnie:', data))
          .then(localStorage.setItem('user', JSON.stringify(userData)))
          .then(setMessage("Rejestracja zakończona sukcesem"))
          .then(setTimeout(() => {onClose()}, 5000))
          .then(updateUser())
          .then(onClose())
          .catch(error => setMessage('Błąd podczas rejsetracji użytkownika:', error));}
    };

    return(
        <div className={isVisible ? styles.loginContainer : styles.hidden}>
            <div className={styles.loginBox}>
                <span className={styles.closeButton} onClick={handleClose}>
                    &times;
                </span>
                <h2 className={styles.title}>Zarejestruj się już dziś</h2>
                <div className={styles.formContainer}>
                    <label className={styles.label} htmlFor="username">Nazwa Użytkownika:</label>
                    <input
                        type="text"
                        id="username"
                        name="user_name"
                        value={userData.user_name}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <label className={styles.label} htmlFor="password">Hasło:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <label className={styles.label} htmlFor="password">Powtórz Hasło:</label>
                    <input
                        type="password"
                        id="password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        className={styles.input}
                    />
                    <h2 className={styles.title}>Podaj swoje dane</h2>
                    <label className={styles.label} htmlFor="username">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <label className={styles.label} htmlFor="username">Imie:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.username}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <label className={styles.label} htmlFor="username">Drugie Imie:</label>
                    <input
                        type="text"
                        id="second_name"
                        name="second_name"
                        value={userData.second_name}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <label className={styles.label} htmlFor="username">Nazwisko:</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={userData.surname}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <label className={styles.label} htmlFor="username">Płeć:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={userData.gender}
                        onChange={handleInputChange}
                        className={styles.input}
                    >
                        <option value="M">M</option>
                        <option value="W">W</option>
                    </select>
                    <button className={styles.button} onClick={handleRegister}>Zarejestruj</button>
                    <p className={styles.info}>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default Regsiter;