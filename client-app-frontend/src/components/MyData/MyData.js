import { useEffect, useState } from "react"
import styles from "./MyData.module.css";

export default function MyData({userId = null}) {

    const [userData, setUserData] = useState({
        user_id: '',
        user_name: '',
        email: '',
        password: '',
        access_rights: '',
        name: '',
        second_name: '',
        surname: '',
        gender: '',
        subscription_expiration: '',
        subscription_plan_id: ''
      });

    const [buttonText, setButtonText] = useState("Zatwierdź zmiany");
    
    
    useEffect(() => {
            const fetchData = async () => {
            try {
                if(userId) {
                  //Pobierz usera o podanym Id
                }
                else {
                  const gotUser = JSON.parse(localStorage.getItem('user'));
                  if(gotUser){ setUserData(gotUser)}
                } 
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData();
      }, []); // Pusta tablica zależności oznacza, że useEffect zostanie uruchomiony tylko raz (po zamontowaniu komponentu)

    const handleInputChange = (e) => {
        setUserData({
          ...userData,
          [e.target.name]: e.target.value,
        });
      };

      const handleUpdateUser = () => {
        // Wyślij zaktualizowane dane użytkownika na serwer
        fetch(`http://localhost:8000/client/update_user/${userData.user_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then(response => response.json())
          .then(data => console.log('Użytkownik zaktualizowany pomyślnie:', data))
          .then(localStorage.setItem('user', JSON.stringify(userData)))
          .then(setButtonText("Dane zostały zaktualizowane"))
          .catch(error => console.error('Błąd podczas aktualizacji użytkownika:', error));
      };
    return (
        <div className={styles.container}>
            <label className={styles.label}>
                Nazwa użytkownika:
                <input type="text" value={userData.user_name} disabled className={styles.input}/>
            </label>
            <label className={styles.label}>
                Id użytkownika:
                <input type="text" value={userData.user_id} disabled className={styles.input}/>
            </label>
            <label className={styles.label}>
                Imie:
                <input type="text" name="name" value={userData.name} onChange={handleInputChange} className={styles.input}/>
            </label>
            <label className={styles.label}>
                Drugie imie:
                <input type="text" name="second_name" value={userData.second_name} onChange={handleInputChange} className={styles.input}/>
            </label>
            <label className={styles.label}>
                Nazwisko:
                <input type="text" name="surname" value={userData.surname} onChange={handleInputChange} className={styles.input}/>
            </label>
            <label className={styles.label}>
                Płeć:
                <input type="text" value={userData.gender} disabled className={styles.input}/>
            </label>
            <label className={styles.label}>
                Adres email:
                <input type="text" name = "email" value={userData.email} onChange={handleInputChange} className={styles.input}/>
            </label>
            <label className={styles.label}>
                Aktywny pakiet:
                <input type="text" name="subscription_plan_id" value={userData.subscription_plan_id} disabled className={styles.input}/>
            </label>
            <label className={styles.label}>
                Data wygaśnięcia pakietu:
                <input type="text" name="subscription_expiration" value={userData.subscription_expiration} disabled className={styles.input}/>
            </label>
            <button type="submit" onClick = {handleUpdateUser} className={styles.button}>{buttonText}</button>
        </div>
    )
}