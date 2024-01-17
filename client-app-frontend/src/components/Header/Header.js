import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Navigation from './Navigation.js';

import Logo from '../../assets/Logo.png';

/**
 * Header Component
 * 
 * Komponent implementujący nagłówek aplikacji wyświetlany na górze strony.
 * 
 * @component
 * @returns {JSX.Element} - Zwraca JSX element reprezentujący nagłówek z logo i nawigacją.
 */
const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}> 
                <Link to='/'>
                    <img src={Logo} alt="" width="auto" height="auto" />
                </Link>
            </div>
            <div className={styles.item}>
                <Navigation/>
            </div>
        </div>
    );
}

export default Header;