import React, { useState } from 'react';
import { Box } from '@mui/material';
import Plan from '../components/TrainingPlan/Plan';
import UserChoose from '../components/UserChoose/UserChoose';
import Subsription from '../components/Subscription/Subscription';
import MyData from '../components/MyData/MyData';

const MyAccount = () => {

  const menu = ["Kalendarz", "Mój pakiet", "Moje dane", "Progres"];
  const [activeView, setActiveView] = useState("Kalendarz");

  function onChangeView(view) {
    console.log(view);
    setActiveView(view);
  }


  return (
    <Box>
      <UserChoose options={menu} onChangeView={onChangeView} activeView={activeView}/>
      {activeView == "Kalendarz" && <Plan/>}
      {activeView == "Mój pakiet" && <Subsription/>}
      {activeView == "Moje dane" && <MyData/>}
    </Box>
  );
};

export default MyAccount;