// DualPicklistForm.jsx
import styles from './TrainingCreator.module.css';
import { v4 as uuidv4 } from 'uuid';

import React, { useEffect, useState } from 'react';

const TrainingCreator = ({fortmatDate}) => {
  const [selectedOption1, setSelectedOption1] = useState('08:00');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [user, setUser] = useState(null);
  const [trainers, setTrainers] = useState();

  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  //Dodanie nowego treningu
  const handleFormSubmit = async (e) => {
    try {
        e.preventDefault();
        const fortmattedDate = fortmatDate();
        const chosedDate = `${fortmattedDate}T${selectedOption1}:00Z`;
        console.log(`Chosed date: ${chosedDate}`);

        const postData = {
          trainings_id: uuidv4(),
          start: chosedDate,
          end: null,
          locker_num: null,
          client: user.user_id,
        };
        postData.trainings_id = parseInt(postData.trainings_id, 10);
        postData.client = parseInt(postData.client, 10);
        
        const response = await fetch('http://localhost:8000/client/training_api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
        });

        if (response.ok) {
          // Trening został dodany pomyślnie
          const result = await response.json();
          console.log(result);
        } else {
          // Obsługa błędu, jeśli wystąpił
          console.error('Błąd podczas dodawania treningu');
        }
      } catch (error) {
        console.error('Error adding Training:', error);
      }
  };

  //Pobranie danych o zalogowanym uzytkowniku
  useEffect(() => {
    const fetchData = async () => {
    try {   
        const gotUser = JSON.parse(localStorage.getItem('user'));
        if(gotUser)
        {
            console.log(gotUser)
            setUser(gotUser);
        }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchTrainers = async () => {
    try {
      const response = await fetch(`http://localhost:8000/client/user_api`);
      const result = await response.json();
      if (Array.isArray(result)) {
      await setTrainers(result.filter(obj => obj.access_rights === "TRN"));
      setSelectedOption2(trainers[0].user_id); 
    } else {
      console.error('Error fetching trainers. Data is not an array.');
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  fetchData();
  fetchTrainers();
  }, []); // Pusta tablica zależności oznacza, że useEffect zostanie uruchomiony tylko raz (po zamontowaniu komponentu) 
  const hours = ["08:00", "09:00","10:00","11:00","12:00","13:00", "14:00", "15:00", "16:00", "17.00", "18.00", "19.00", "20.00", "21.00"];

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
              {trainers && trainers.map((trainer) => (
                <option key={trainer.user_id} value={trainer.user_id}>
                  {`${trainer.name} ${trainer.surname}`}
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
