import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portier from './pages/Portier.js';
import UserDetails from './components/UserDeatils/UserDetails.js';
import Trainer from './pages/Trainer.js';
import Administrator from './pages/Administrator.js'
import Header from './components/Header/Header.js';
import Home from './pages/Home.js';
import MyAccount from './pages/MyAccount.js';
import Footer from './components/Footer/Footer.js';
import { Box } from '@mui/system';
import './App.css';

function App() {
  const items = {clubs: {to: 'ourClubs', desc: 'Nasze kluby'}}
  return (
    <Box m="auto">
      <Router>
        <Header items={items}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MyAccount" element={<MyAccount />} />
          <Route path="/portier" element={ <Portier/> }/>
          <Route path="/user/:userId" element={<UserDetails/>}/>
          <Route path="trener" element={<Trainer/>}/>
          <Route path="administrator" element={<Administrator/>}/>
        </Routes>
        <Footer />
      </Router>
    </Box>
  );
}

export default App;
