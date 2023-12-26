import React from 'react';
import styles from './UsersTable.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const UsersTable = ({ users }) => {

  const [searchId, setSearchId] = useState('');
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

  const registerUser = (userId) => {
    console.log(`Zarejestrowano użytkownika o ID: ${userId}`);
  }

  const filteredUsers = users.filter(user => {
    return (
      user.id.toString().includes(searchId) &&
      user.firstName.toLowerCase().includes(searchFirstName.toLowerCase()) &&
      user.lastName.toLowerCase().includes(searchLastName.toLowerCase()) &&
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
  });
  return (
    <table className={styles.user}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Email</th>
          <th>Zarejestruj Wejście</th>
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
        {filteredUsers.map((user) => (
          <tr key={user.id}>
            <td><Link to={`/user/${user.id}`}>{user.id}</Link></td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>
                <button onClick={() => registerUser(user.id)} className={styles.button}>
                  Zarejestruj
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
