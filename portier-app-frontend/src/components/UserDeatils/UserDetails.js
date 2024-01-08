// UserProfile.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import MyData from '../MyData/MyData';
import styles from './UserDetails.module.css'
import ConfirmBox from '../ConfirmBox/ConfirmBox';
import { useState } from 'react';
import Payments from '../MyData/Payments';

const UserDetails = ({ users }) => {
  const { userId } = useParams();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const openConfirmationDialog = () => {
        setIsConfirmationOpen(true);
  }

  const closeConfirmationDialog = () => {
        setIsConfirmationOpen(false);
  }
  // Funkcja usuwajaca uzytkownika z bazy danych
  const handleDelete = (event) => {
    event.preventDefault();
    setIsConfirmationOpen(false);
    // Tutaj możesz obsłużyć zatwierdzenie zmian, na przykład wysłać dane na serwer
    console.log('Usuwam');
  };

  return (
      <div className={styles.container}>
      <div>
        <h2 className={styles.header}>Profil użytkownika: {userId}</h2>
        <MyData/>
        <button className={styles.button} onClick={openConfirmationDialog}>Usuń użytkownika</button>
        {isConfirmationOpen && <ConfirmBox message={`Czy na pewno chcesz usunąć użytkownika o id: ${userId}?`} onConfirm={handleDelete} onClose={closeConfirmationDialog}/>}
      </div>
      <div>
        <Payments/>
      </div>
      </div>
  );
};

export default UserDetails;
