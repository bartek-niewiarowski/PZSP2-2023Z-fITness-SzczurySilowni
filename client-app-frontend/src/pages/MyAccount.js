import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Plan from '../components/TrainingPlan/Plan';
import UserChoose from '../components/UserChoose/UserChoose';
import Subsription from '../components/Subscription/Subscription';
import MyData from '../components/MyData/MyData';
import Progress from '../components/Progress/Progress';

const MyAccount = () => {

  const menu = ["Kalendarz", "Mój pakiet", "Moje dane", "Progres"];
  const [activeView, setActiveView] = useState("Kalendarz");

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

  function onChangeView(view) {
    console.log(view);
    setActiveView(view);
  }

  useEffect(() => {
    const fetchData = async () => {
    try {
      const gotUser = JSON.parse(localStorage.getItem('user'));
      if(gotUser){ setUserData(gotUser)}
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
  }, []); // Pusta tablica zależności oznacza, że useEffect zostanie uruchomiony tylko raz (po zamontowaniu komponentu)

  return (
    <Box>
      <UserChoose options={menu} onChangeView={onChangeView} activeView={activeView}/>
      {activeView == "Kalendarz" && <Plan/>}
      {activeView == "Mój pakiet" && <Subsription/>}
      {activeView == "Moje dane" && <MyData userId={userData.user_id}/>}
      {activeView == "Progres" && <Progress userId={userData.user_id}/>}
    </Box>
  );
};

export default MyAccount;