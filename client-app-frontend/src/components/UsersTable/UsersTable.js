import React, { useEffect } from 'react';
import styles from './UsersTable.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Regsiter from '../Register/Register';

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
      console.log(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // useEffect runs only once after the component is mounted

  const registerEntry = (userId) => {
    console.log(`Zarejestrowano użytkownika o ID: ${userId}`);
  }

  const registerExit = (userId) => {
    console.log(`Zarejestrowano użytkownika o ID: ${userId}`);
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
                <button onClick={() => registerEntry(user.id)} className={styles.button}>
                  Zarejestruj
                </button>
            </td>
            <td>
                <button onClick={() => registerExit(user.id)} className={styles.button}>
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
