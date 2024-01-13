import React from 'react';
import { Box } from '@mui/material';

import ImageSplit from '../components/ImageSplit/ImageSplit';

/**
 * Komponent reprezentujący stronę domową.
 * 
 * @component
 * @returns {JSX.Element} - Zwraca JSX element reprezentujący interfejs strony domowej.
 */
const Home = () => {

  return (
    <Box>
      <ImageSplit/>
    </Box>
  );
};

export default Home;