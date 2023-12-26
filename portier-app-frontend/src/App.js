import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/system';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js'
import Home from './pages/Home.js';
import UserDetails from './components/UserDeatils/UserDetails.js';

function App() {
  const items = {clubs : {to: 'ourClubs', desc: 'Nasze kluby'}}
  return (
    <Box m="auto">
      <Router>
        <Header items={items}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:userId" element={<UserDetails/>}/>
        </Routes>
        <Footer />
      </Router>
    </Box>
  );
}

export default App;
