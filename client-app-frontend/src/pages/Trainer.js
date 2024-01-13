import React from 'react';
import { Box } from '@mui/system';
import TrainerPlan from '../components/TrainerPlan/TrainerPlan';

/**
 * Komponent reprezentujący widok Trenera.
 * 
 * @component
 * @returns {JSX.Element} - Zwraca JSX element reprezentujący widok Trenera.
 */
const Trainer = () => {
  return (
    <Box>
      <div>
        <TrainerPlan/>
      </div>
    </Box>
  );
};

export default Trainer;
