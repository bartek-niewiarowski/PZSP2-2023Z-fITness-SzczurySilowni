// TrainingCreator.jsx
import styles from './TrainingCreator.module.css';

import React, { useEffect, useState } from 'react';

const TrainingCreator = ({ fortmatDate }) => {
  const [selectedOption1, setSelectedOption1] = useState('08:00');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [selectedOption3, setSelectedOption3] = useState('09.00');
  const [selectedOption4, setSelectedOption4] = useState('');
  const [user, setUser] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [gyms, setGyms] = useState([]);

  const generateSixDigitId = () => {
    return Math.floor(100000 + Math.random() * 900000); // Losowa liczba od 100000 do 999999
  };

  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleOptionChange3 = (event) => {
    setSelectedOption3(event.target.value);
  };

  const handleOptionChange4 = (event) => {
    setSelectedOption4(event.target.value);
  };

  // Dodanie nowego spotkania
  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const formattedDate = fortmatDate();
      const chosenStart = `${formattedDate}T${selectedOption1}:00Z`;
      const chosenEnd = `${formattedDate}T${selectedOption3}:00Z`;
      const postData = {
        appointment_id: generateSixDigitId(),
        planned_start: chosenStart,
        planned_end: chosenEnd,
        comment: null,
        trainer: selectedOption2,
        client: user.user_id,
        gym: selectedOption4,
        training: null,
      };
      console.log(JSON.stringify(postData));
      postData.appointment_id = parseInt(postData.appointment_id, 10);
      postData.client = parseInt(postData.client, 10);
      postData.trainer = parseInt(postData.trainer, 10);
      postData.gym = parseInt(postData.gym, 10);

      const response = await fetch('http://localhost:8000/trainer/add_appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // Spotkanie zostało dodane pomyślnie
        const result = await response.json();
        console.log(result);
        
      } else {
        // Obsługa błędu, jeśli wystąpił
        console.error('Błąd podczas dodawania spotkania');
      }
    } catch (error) {
      console.error('Error adding Appointment:', error);
    }
  };

  // Pobranie danych o zalogowanym użytkowniku i trenerach
  useEffect(() => {
    const fetchData = async () => {
      try {
        const gotUser = JSON.parse(localStorage.getItem('user'));
        if (gotUser) {
          setUser(gotUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchTrainers = async () => {
      try {
        const response = await fetch(`http://localhost:8000/client/user_api`);
        const result = await response.json();
        if (Array.isArray(result)) {
          await setTrainers(result.filter(obj => obj.access_rights === "TRN"));
          setSelectedOption2(trainers[0]?.user_id);
        } else {
          console.error('Error fetching trainers. Data is not an array.');
        }
      } catch (error) {
        console.error('Error fetching trainers data:', error);
      }
    };

    const fetchGyms = async () => {
      try {
        const response = await fetch(`http://localhost:8000/trainer/get_gyms`);
        const result = await response.json();
        if (Array.isArray(result)) {
          await setGyms(result);
          setSelectedOption4(result[0]?.gym_id);
        } else {
          console.error('Error fetching trainers. Data is not an array.');
        }
      } catch (error) {
        console.error('Error fetching trainers data:', error);
      }
    }

    fetchData();
    fetchTrainers();
    fetchGyms();
  }, []); // Dodano trainers do zależności useEffect

  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17.00", "18.00", "19.00", "20.00", "21.00"];

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.choose}>
          {/* Pierwsza picklista */}
          <label className={styles.label}>
            Wybierz Godzinę Startu:
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

          <label className={styles.label}>
            Wybierz Godzinę Zakończenia:
            <select
              value={selectedOption3}
              onChange={handleOptionChange3}
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
              {trainers && trainers.map((trainer) => (
                <option key={trainer.user_id} value={trainer.user_id}>
                  {`${trainer.name} ${trainer.surname}`}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.label}>
            Wybierz Siłownię:
            <select
              value={selectedOption4}
              onChange={handleOptionChange4}
              className={styles.input}
            >
              {gyms && gyms.map((trainer) => (
                <option key={trainer.gym_id} value={trainer.gym_id}>
                  {`${trainer.name}`}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Przycisk do zatwierdzania zmian */}
        <button type="submit" className={styles.button} onClick={handleFormSubmit}>
          Zaplanuj trening
        </button>
      </form>
    </div>
  );
};

export default TrainingCreator;
