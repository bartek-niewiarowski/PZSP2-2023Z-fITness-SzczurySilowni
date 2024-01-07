import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';

import styles from './Navigation.module.css'; // Import your CSS file

function Navigation({items}) {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  const isUserLoggedIn = !!localStorage.getItem('user');
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsLoginVisible(true);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('user');
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

  const handleNavigation = (role) => {
    if (true) {
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
            <li className={styles.listItem}>
              <div className={styles.roleDropdown}>
                <span>Przejdź do:</span>
                <select onChange={(e) => handleNavigation(e.target.value)} className={styles.roleDropdown}>
                  <option value="Klient">Klient</option>
                  <option value="Trener">Trener</option>
                  <option value="Portier">Portier</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>
            </li>
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