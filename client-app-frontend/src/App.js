import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ImageSplit from './components/ImageSplit/ImageSplit';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';

function App() {
  return (
    <Box m="auto">
      <BrowserRouter>
        <Header/>
      </BrowserRouter>
      <ImageSplit/>
    <Footer/>
    </Box>
  );
}

export default App;
