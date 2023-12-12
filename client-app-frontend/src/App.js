import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Home from './pages/Home.js';
import MyAccount from './pages/MyAccount.js';
import Footer from './components/Footer/Footer.js'
import { Box } from '@mui/system';
import './App.css';

function App() {
  return (
    <Box m="auto">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MyAccount" element={<MyAccount />} />
        </Routes>
        <Footer />
      </Router>
    </Box>
  );
}

export default App;
