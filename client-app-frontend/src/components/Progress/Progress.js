import React, { useState, useEffect } from 'react';
import styles from './Progress.module.css'


/**
 * Progress Component
 * 
 * Komponent implementujący wybór miesiąca i roku do monitorowania postępów użytkownika.
 * 
 * @component
 * @param {Object} props - Właściwości komponentu.
 * @param {string} props.userId - Identyfikator użytkownika, dla którego monitorowane są postępy.
 * @returns {JSX.Element} - Zwraca JSX element reprezentujący wybór miesiąca i roku.
 */
const Progress = ({userId}) => {
  const months = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień',
    'Maj', 'Czerwiec', 'Lipiec', 'Sierpień',
    'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];

  const [reportData, setReportData] = useState({
        total_time: '',
        most_common_trainer: '',
        num_trainings: '',
        num_appointments: ''
      });

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchData = async (currentYear, currentMonth) => {
    try {
        if(userId) {
          try {
            const response = await fetch(`http://localhost:8000/client/get_report/${userId}/${currentYear}/${currentMonth+1}`);
            const result = await response.json();
            if (result) {
              if(length(result.most_common_trainer) > 1 ) {
                result.most_common_trainer = result.most_common_trainer.join(', ');
              }
              setReportData(result);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
    fetchData(currentYear, currentMonth);
  }, []);

  const handlePrevMonth = async () => {
    setSelectedMonth((prevMonth) => {
      const newMonth = (prevMonth - 1 + 12) % 12;
      if (newMonth === 11 && prevMonth === 0) {
        const newYear = selectedYear - 1;
        setSelectedYear(newYear);
        fetchData(newYear, newMonth)
      }
      else {fetchData(selectedYear, newMonth)}
      return newMonth;
    });
  };

  const handleNextMonth = async () => {
    setSelectedMonth((prevMonth) => {
      const newMonth = (prevMonth + 1) % 12;
      if (newMonth === 0 && prevMonth === 11) {
        const newYear = selectedYear + 1;
        setSelectedYear(newYear);
        fetchData(newYear, newMonth);
      }
      else {fetchData(selectedYear, newMonth)}
      return newMonth;
    });
  };

  return (
    <div className={styles.container}>
        <div className={styles.container}>
            <h2>Twój progress na wybrany miesiąc</h2>
            <br />
            <div className={styles.report}>
                <h3>Razem na siłowni przebywałeś/aś przez { reportData.total_time / 3600} godzin!</h3>
                <h3>W tym czasie odbyłeś/aś { reportData.num_trainings } treningów </h3>
                <h3>W tym czasie odbyłeś/aś { reportData.num_appointments } zajęć z trenerami osobistym </h3>
                <h3>Twoi ulubieni trenerzy to: { reportData.most_common_trainer } </h3>
            </div>
        </div>
      <div className={styles.monthPickerContainer}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>{months[selectedMonth]} {selectedYear}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
    </div>
  );
};

export default Progress;
