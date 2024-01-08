import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Import your CSS file
import Navigation from './Navigation.js';

import Logo from '../../assets/Logo.png';

//Komponent implementujacy header aplikacji wyswietlany na gorze strony aplikacji
const Header = (items) => {
    return (
        <div className={styles.container}>
            <div className={styles.item}> 
                <Link to='/'>
                    <img src={Logo} alt="" width="auto" height="auto" />
                </Link>
            </div>
            <div className={styles.item}>
                <Navigation items={items}/>
            </div>
        </div>
    );
}

export default Header;