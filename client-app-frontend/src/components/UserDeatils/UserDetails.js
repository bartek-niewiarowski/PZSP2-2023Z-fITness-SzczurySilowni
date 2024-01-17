import React from 'react';
import { useParams } from 'react-router-dom';
import MyData from '../MyData/MyData';
import styles from './UserDetails.module.css'
import ConfirmBox from '../ConfirmBox/ConfirmBox';
import { useState } from 'react';
import Payments from '../MyData/Payments';

/**
 * Komponent implementujący modyfikacje danych użytkownika po stronie Portiera.
 * 
 * @component
 * @returns {JSX.Element} - Zwraca JSX element reprezentujący interfejs zarządzania danymi użytkownika.
 */
const UserDetails = () => {
  const { userId } = useParams();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const openConfirmationDialog = () => {
        setIsConfirmationOpen(true);
  }

  const closeConfirmationDialog = () => {
        setIsConfirmationOpen(false);
  }
  
  /**
   * Obsługuje usunięcie użytkownika po zatwierdzeniu w oknie dialogowym.
   * @param {Event} event - Obiekt zdarzenia.
   * @returns {void}
   */
  const handleDelete = (event) => {
    event.preventDefault();
    setIsConfirmationOpen(false);
    // Tutaj możesz obsłużyć zatwierdzenie zmian, na przykład wysłać dane na serwer
    console.log('Usuwam');
  };

  return (
      <div>
        <h2 className={styles.header}>Profil użytkownika: {userId}</h2>
        <MyData userId={userId}/>
        <button className={styles.button} onClick={openConfirmationDialog}>Usuń użytkownika</button>
        {isConfirmationOpen && <ConfirmBox message={`Czy na pewno chcesz usunąć użytkownika o id: ${userId}?`} onConfirm={handleDelete} onClose={closeConfirmationDialog}/>}
      </div>
  );
};

export default UserDetails;
