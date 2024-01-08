import React from 'react';
import styles from './ImageSplit.module.css';

import Gym from '../../assets/Gym.png';
import Text from '../../assets/Text.png';

// Komponent implementujacy wyswietlanie zdjec na stronie startowej
const ImageSplit = () => {
  return (
    <div className={styles.imageSplitContainer}>
      <div className={styles.imageContainer}>
        <img src={Text} alt="Image 1" className={styles.image} />
      </div>
      <div className={styles.imageContainer}>
        <img src={Gym} alt="Image 2" className={styles.image} />
      </div>
    </div>
  );
};

export default ImageSplit;
