import { useEffect, useState } from "react";
import styles from "./Subscription.module.css";
import ConfirmBox from "../ConfirmBox/ConfirmBox";

// Komponent implementujacy wyswietlenie i wybor aktywnej subskrybcji
export default function Subscription() {
  const [activeSub, setActiveSub] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [buttonText, setButtonText] = useState('');
  const [activeSubscription, setActiveSubscription] = useState({
    subscription_plan_id: "",
    name: "",
    cost: null
  });
  const [userData, setUserData] = useState({
    user_id: null,
    user_name: '',
    email: '',
    password: '',
    access_rights: '',
    name: '',
    second_name: '',
    surname: '',
    gender: '',
    subscription_expiration: null,
    subscription_plan_id: null
  });
  //Zmiana wybranej subskrypcji
  const handleSubChange = (sub) => {
    setActiveSub(sub);
    setUserData({
      ...userData,
      subscription_plan_id: sub,
    });
  };
  //Update danych uzytkownika
  const UpdateUser = () => {
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
      .then(setButtonText(`Zmieniono subskrypcję na: ${activeSubscription.name}.`))
      .catch(error => console.error('Błąd podczas aktualizacji użytkownika:', error));
  };
  //Otwarcie okna dialogowego
  const openConfirmationDialog = () => {
    setIsConfirmationOpen(true);
  }
  //Zamkniecie okna dialogowego
  const handleClose = () => {
    setIsConfirmationOpen(false);
  }
  //Zamkniecie okna dialogowego i update danych uzytkownika
  const handleConfirm = () => {
    setIsConfirmationOpen(false);
    UpdateUser();
  }
  //Pobranie poczatkowych danych
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/client/get_subscription');
        const result = await response.json();
        console.log(result);
        setSubscriptionPlans(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const getUser = () => {
      try {
        const gotUser = JSON.parse(localStorage.getItem('user'));
        if (gotUser) {
          setUserData(gotUser);
          setActiveSub(gotUser.subscription_plan_id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    getUser();
    fetchData();
  }, []); // useEffect runs only once after the component is mounted

  useEffect(() => {
    // Check if subscriptionPlans is an array and activeSub is not an empty string
    if (Array.isArray(subscriptionPlans) && activeSub !== '') {
      const gotActiveSubscription = subscriptionPlans.find(
        (plan) => plan.subscription_plan_id === activeSub
      );
      if (gotActiveSubscription) {
        setActiveSubscription(gotActiveSubscription);
      }
    }
  }, [subscriptionPlans, activeSub]);

  return (
    <div>
      <div className={styles.viewList}>
        {Array.isArray(subscriptionPlans)
          ? subscriptionPlans.map((plan) => (
            <div
              key={plan.subscription_plan_id}
              className={`${styles.view} ${
                activeSub === plan.subscription_plan_id ? styles.active : ""
              }`}
              onClick={() => handleSubChange(plan.subscription_plan_id)}
            >
              <div className={styles.text}>
                {plan.name}
              </div>
            </div>
          ))
          : <p>Error: subscriptionPlans is not an array</p>}
      </div>
      {activeSub !== '' && (
        <div className={styles.info}>
          <div>{activeSubscription.name}</div>
          <div>Cena pakietu: {activeSubscription.cost}</div>
          <button className={styles.button} onClick={openConfirmationDialog}>Wybieram ten pakiet</button>
        </div>
      )}
      {isConfirmationOpen && (
        <ConfirmBox message={`Czy jesteś pewien że chcesz zmienić pakiet na: ${activeSubscription.name}?`} onClose={handleClose} onConfirm={handleConfirm}/>
      )}
    </div>
  );
}
