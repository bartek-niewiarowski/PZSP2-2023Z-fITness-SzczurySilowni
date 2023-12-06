import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css'; // Import your CSS file
import Navigation from './Navigation.js';

import Logo from '../../assets/Logo.png';

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}> 
                <Link to='/'>
                    <img src={Logo} alt="" width="auto" height="auto" />
                </Link>
            </div>
            <div className={styles.item}>
                <ul className={styles.list}>
                    <Navigation />
                </ul>
            </div>
        </div>
    );
}

export default Header;