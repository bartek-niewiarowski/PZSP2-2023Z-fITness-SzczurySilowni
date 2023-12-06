import React from 'react';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import styles from './Navbar.module.css';

import Logo from '../assets/Logo.png';

const Navbar = () => (
  <Stack direction="row" className={styles.stackContainer}>
    <Link to="/">
      <img src={Logo} alt="logo" className={styles.Link} />
    </Link>
    <Stack className={styles.roadContainer}>
      <Link to="/" className={styles.Link}>About Us</Link>
      <a href="#exercises" className={styles.Link}>Exercises</a>
      <div>Sing In</div>
      <div>Sing Up</div>
    </Stack>
  </Stack>
);

export default Navbar;