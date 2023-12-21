import React, { useState } from 'react';
import { Box } from '@mui/material';
import Plan from '../components/TrainingPlan/Plan';
import UserChoose from '../components/UserChoose/UserChoose';
import Subsription from '../components/Subscription/Subscription';
import MyData from '../components/MyData/MyData';

const MyAccount = () => {

  const menu = ["Calendar", "Subsription", "Traning Plan", "My Data"];
  const [activeView, setActiveView] = useState("Calendar");

  function onChangeView(view) {
    console.log(view);
    setActiveView(view);
  }


  return (
    <Box>
      <UserChoose options={menu} onChangeView={onChangeView} activeView={activeView}/>
      {activeView == "Calendar" && <Plan/>}
      {activeView == "Subsription" && <Subsription/>}
      {activeView == "My Data" && <MyData/>}
    </Box>
  );
};

export default MyAccount;