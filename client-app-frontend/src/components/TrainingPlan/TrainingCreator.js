// DualPicklistForm.jsx
import styles from './TrainingCreator.module.css';

import React, { useState } from 'react';

const TrainingCreator = () => {
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');

  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Zatwierdzono zmiany:', { selectedOption1, selectedOption2 });
    // Tutaj możesz obsłużyć zatwierdzenie zmian, na przykład wysłać dane na serwer
  };

  const hours = ["8.00", "9.00","10.00","11.00","12.00","13.00", "14.00", "15.00", "16.00"];
  const coaches = ["Marek Gacek", "Franek Koc", "Arkadiusz Kloc"];

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.choose}>
          {/* Pierwsza picklista */}
          <label className={styles.label}>
            Wybierz Godzinę:
            <select
              value={selectedOption1}
              onChange={handleOptionChange1}
              className={styles.input}
            >
              {hours.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          {/* Druga picklista */}
          <label className={styles.label}>
            Wybierz Trenera:
            <select
              value={selectedOption2}
              onChange={handleOptionChange2}
              className={styles.input}
            >
              {coaches.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Przycisk do zatwierdzania zmian */}
        <button type="submit" className={styles.button}>
          Zaplanuj trening
        </button>
      </form>
    </div>
  );
};

export default TrainingCreator;
