import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';

function App() {
  return (
    <Box m="auto">
      <BrowserRouter>
        <Header/>
      </BrowserRouter>
    </Box>
  );
}

export default App;
