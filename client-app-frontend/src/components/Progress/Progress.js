import React, { useState, useEffect } from 'react';
import styles from './Progress.module.css'

const Progress = ({userId}) => {
  const months = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień',
    'Maj', 'Czerwiec', 'Lipiec', 'Sierpień',
    'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
  }, []);

  const handlePrevMonth = () => {
    setSelectedMonth((prevMonth) => {
      const newMonth = (prevMonth - 1 + 12) % 12;
      if (newMonth === 11 && prevMonth === 0) {
        const newYear = selectedYear - 1;
        setSelectedYear(newYear);
      }
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setSelectedMonth((prevMonth) => {
      const newMonth = (prevMonth + 1) % 12;
      if (newMonth === 0 && prevMonth === 11) {
        const newYear = selectedYear + 1;
        setSelectedYear(newYear);
      }
      return newMonth;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.monthPickerContainer}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>{months[selectedMonth]} {selectedYear}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
    </div>
  );
};

export default Progress;
