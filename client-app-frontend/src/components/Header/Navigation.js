import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';

import styles from './Navigation.module.css'; // Import your CSS file

/**
 * Navigation Component
 * 
 * Komponent implementujący nawigację w aplikacji.
 * 
 * @component
 * @returns {JSX.Element} - Zwraca JSX element reprezentujący nawigację z linkami i funkcjonalnością logowania.
 */
function Navigation() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  const isUserLoggedIn = !!localStorage.getItem('user');
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsLoginVisible(true);
  };
  // Funkcja obslugujaca wylogowywanie
  const handleLogoutClick = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
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
  // Funkcja przekierowujca uzytkownika do wybranej czesci
  const redirectToRolePage = (role) => {
    switch (role) {
      case 'Klient':
        navigate('/');
        break;
      case 'Trener':
        navigate('/trener');
        break;
      case 'Portier':
        navigate('/portier');
        break;
      case 'Administrator':
        navigate('/administrator');
        break;
      default:
        navigate('/');
        break;
    }
  };
  // Funkcja sprawdzajaca czy uzytkownik ma dostep do danej czesci aplikacji
  const checkPermision = (role) => {
    if(loggedUser.access_rights === "ADM") return true;
    else if(loggedUser.access_rights === "PRT" && (role === "Klient" || role === "Portier")) return true;
    else if(loggedUser.access_rights === "TRN" && (role === "Klient" || role === "Trener")) return true;
    else if(loggedUser.access_rights === "USR" && role === "Klient") return true;
    else return false;
  }
  // Funkcja realizujca nawigacje po 4 glownych modulach aplikacji
  const handleNavigation = (role) => {
    if (checkPermision(role)) {
      redirectToRolePage(role);
    } else {
      alert('Brak odpowiednich uprawnień do tej sekcji.');
    }
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
          { isUserLoggedIn &&
          <>
            <li className={styles.listItem}>
              <Link className={styles.link} to='/MyAccount'>Moje Konto</Link>
            </li>
            <a onClick={handleLogoutClick} className={styles.listItem}>
            Wyloguj sie
            </a>
            {loggedUser.access_rights !== "USR" && <li className={styles.listItem}>
              <div className={styles.roleDropdown}>
                <span>Przejdź do:</span>
                <select onChange={(e) => handleNavigation(e.target.value)} className={styles.roleDropdown}>
                  <option value="Klient">Klient</option>
                  <option value="Trener">Trener</option>
                  <option value="Portier">Portier</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>
            </li>}
          </>}
          { !isUserLoggedIn &&
          <>
            <a onClick={handleLoginClick} className={styles.listItem}>
              Logowanie
            </a>
            <Login isVisible ={isLoginVisible} onClose={handleLoginClose} />
            <a onClick={handleRegisterClick} className={styles.listItem}>
              Rejestracja
            </a>
            <Register isVisible ={isRegisterVisible} onClose={handleRegisterClose} />
          </>
          }
        </ul>
      </nav>
  );
}

export default Navigation;