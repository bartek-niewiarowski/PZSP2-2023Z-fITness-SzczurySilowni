import React, { useEffect } from 'react';
import styles from './UsersTable.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Regsiter from '../Register/Register';
import { v4 as uuidv4 } from 'uuid';
/**
 * User Table.
 * @component
 *
 * Komponent wyswietlajacy liste uzytkownikow
 * Umozliwia rejestracje wejscia i wyjscia danego uzytkownika
 * Pod polem id znjaduje sie link do danych konkretnego uzytkownika
 * Uzywajac przycisku "Dodaj nowego uzytkownika" wyswietla sie okno rejestracji
 * 
 * @example
 *
 * <UsersTable />
 *
 * @returns {JSX.Element}
 */
const UsersTable = () => {

  const [searchId, setSearchId] = useState('');
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [users, setUsers] = useState(null);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const openRegistrationModal = () => {
    setIsRegisterVisible(true);
  };

  const closeRegistrationModal = () => {
    setIsRegisterVisible(false);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/client/user_api`);
      const result = await response.json();
      setUsers(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Generowanie pelnej daty
  const todayDate = () => {
    const today = new Date();
  
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const seconds = today.getSeconds().toString().padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  // Generowanie pelnej daty bez godziny
  const todayDateGet = () => {
    const today = new Date();
  
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  
  useEffect(() => {
    fetchData();
  }, []); // useEffect runs only once after the component is mounted
  
  // Rejestracja wejscia uzytkownika
  const registerEntry = async (userId) => {
    try {
        userId = parseInt(userId, 10);
        const today = todayDate()
        const response = await fetch(`http://localhost:8000/client/training_api?start=${todayDateGet()}&client=${userId}`);
        const result = await response.json();
        const incompleteTrainings = result.filter(training => training.end === null);
        if (incompleteTrainings.length === 0) {
          // Jeśli brak niezakończonych treningów, dodaj nowy trening
          const postData = {
            trainings_id: uuidv4(),
            start: today,
            end: null,
            locker_num: null,
            client: userId,
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
            alert('Zarejestrowano wejście użytkownika.');
          } else {
            // Obsługa błędu, jeśli wystąpił
            console.error('Błąd podczas dodawania treningu');
          }
        }
        else {
          alert('Użytkownik aktualnie znajduje się na siłowni.');
        }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const registerExit = async (userId) => {
    try {
      userId = parseInt(userId, 10);
      const today = todayDate()
      const response = await fetch(`http://localhost:8000/client/training_api?start=${todayDateGet()}&client=${userId}`);
      const result = await response.json();
      const incompleteTrainings = result.filter(training => training.end === null);
      if (incompleteTrainings.length === 1) {
        // Jeśli brak niezakończonych treningów, dodaj nowy trening
        const postData = {
          trainings_id: incompleteTrainings[0].trainings_id,
          start: incompleteTrainings[0].start,
          end: today,
          locker_num: null,
          client: userId,
        };
        postData.trainings_id = parseInt(postData.trainings_id, 10);
        postData.client = parseInt(postData.client, 10);
        
        const response = await fetch(`http://localhost:8000/client/update_training/${incompleteTrainings[0].trainings_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
        });

        if (response.ok) {
          // Trening został dodany pomyślnie
          const result = await response.json();
          console.log(result);
          alert('Zarejestrowano wyjście użytkownika.');
        } else {
          // Obsługa błędu, jeśli wystąpił
          console.error('Błąd podczas aktualizacji treningu');
        }
      }
      else {
        alert('Użytkownik aktualnie nie znajduje się na siłowni.');
      }
  } catch (error) {
    console.error('Error updating data:', error);
  }
  }

  const filteredUsers = users && users.filter(user => {
    return (
      user.user_id.toString().includes(searchId) &&
      user.name.toLowerCase().includes(searchFirstName.toLowerCase()) &&
      user.surname.toLowerCase().includes(searchLastName.toLowerCase()) &&
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
  });
  return (
    <div>
      <button onClick={openRegistrationModal} className={styles.registerButton}>
        Dodaj nowego użytkownika
      </button>
      <Regsiter isVisible={isRegisterVisible} onClose={closeRegistrationModal}/>
      <table className={styles.user}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Email</th>
          <th>Zarejestruj Wejście</th>
          <th>Zarejestruj Wyjście</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td>
            <input
                type="text"
                id="searchId"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className={styles.input}
            />
            </td>
            <td>
              <input
                type="text"
                id="searchFirstName"
                value={searchFirstName}
                onChange={(e) => setSearchFirstName(e.target.value)}
                className={styles.input}
              />
            </td>
            <td>
              <input
                type="text"
                id="searchLastName"
                value={searchLastName}
                onChange={(e) => setSearchLastName(e.target.value)}
                className={styles.input}
              />
            </td>
            <td>
              <input
                type="text"
                id="searchEmail"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className={styles.input}
              />
            </td>
            <td/>
          </tr>
        {filteredUsers && filteredUsers.map((user) => (
          <tr key={user.user_id}>
            <td><Link to={`/user/${user.user_id}`}>{user.user_id}</Link></td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>
            <td>
                <button onClick={() => registerEntry(user.user_id)} className={styles.button}>
                  Zarejestruj
                </button>
            </td>
            <td>
                <button className={styles.button}>
                  Zarejestruj
                </button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
    
  );
};

export default UsersTable;
