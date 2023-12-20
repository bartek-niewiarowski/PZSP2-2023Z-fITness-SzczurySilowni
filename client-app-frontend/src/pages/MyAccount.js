import React, { useState } from 'react';
import { Box } from '@mui/material';
import Plan from '../components/TrainingPlan/Plan';
import UserChoose from '../components/UserChoose/UserChoose';

const MyAccount = () => {

  const menu = ["Calendar", "Subsription", "Traning Plan"];
  const [activeView, setActiveView] = useState("Calendar");

  function onChangeView(view) {
    console.log(view);
    setActiveView(view);
  }


  return (
    <Box>
      <UserChoose options={menu} onChangeView={onChangeView} activeView={activeView}/>
      {activeView == "Calendar" && <Plan/>}
    </Box>
  );
};

export default MyAccount;