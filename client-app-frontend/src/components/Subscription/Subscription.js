import { useEffect, useState } from "react";
import styles from "./Subscription.module.css";
import ConfirmBox from "../ConfirmBox/ConfirmBox";

/**
 * Subscription Component
 * 
 * Komponent implementujący wybór i zarządzanie aktywną subskrypcją użytkownika.
 * 
 * @component
 * @returns {JSX.Element} - Zwraca JSX element reprezentujący interfejs subskrypcji.
 */
export default function Subscription() {
  const [activeSub, setActiveSub] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isResignOpen, setIsResignOpen] = useState(false);
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
  /**
   * Funkcja do zmiany wybranej subskrypcji.
   * @param {string} sub - Id wybranej subskrypcji.
   * @returns {void}
   */
  const handleSubChange = (sub) => {
    setActiveSub(sub);
  };
  /**
   * Funkcja do aktualizacji danych użytkownika.
   * @returns {void}
   */
  const UpdateUser = () => {
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

  const openConfirmationDialog = () => {
    setIsConfirmationOpen(true);
  }

  const openResignDialog = () => {
    setIsResignOpen(true);
  }

  const handleResignConfirm = () => {
    setActiveSub(null);
    setUserData({
      ...userData,
      subscription_plan_id: null,
    });
    UpdateUser();
    setIsResignOpen(false);
  }

  const handleResignClose = () => {
    setIsResignOpen(false);
  }

  //Zamkniecie okna dialogowego
  const handleClose = () => {
    setIsConfirmationOpen(false);
  }
  //Zamkniecie okna dialogowego i update danych uzytkownika
  const handleConfirm = () => {
    setUserData({
      ...userData,
      subscription_plan_id: activeSub,
    });
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
    <div className={styles.container}>
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
      {activeSub && (
        <div className={styles.info}>
          <div>{activeSubscription.name}</div>
          <div>Cena pakietu: {activeSubscription.cost}</div>
          {activeSub !== userData.subscription_plan_id && <button className={styles.button} onClick={openConfirmationDialog}>Wybieram ten pakiet</button>}
          {activeSub === userData.subscription_plan_id && <button className={styles.button} onClick={openResignDialog}>Zrezygnuj z subskrybcji</button>}
        </div>
      )}
      {isConfirmationOpen && (
        <ConfirmBox message={`Czy jesteś pewien że chcesz zmienić pakiet na: ${activeSubscription.name}?`} onClose={handleClose} onConfirm={handleConfirm}/>
      )}
      {isResignOpen && (
        <ConfirmBox message={`Czy jesteś pewien że chcesz zrezygnować z subskrybcji?`} onClose={handleResignClose} onConfirm={handleResignConfirm}/>
      )}
    </div>
  );
}
