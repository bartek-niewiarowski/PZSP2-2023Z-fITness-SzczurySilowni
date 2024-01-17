import React from 'react';
import { Box } from '@mui/system';
import UsersTable from '../components/UsersTable/UsersTable.js';

/**
 * Komponent reprezentujący interfejs Portiera.
 * 
 * @component
 * @returns {JSX.Element} - Zwraca JSX element reprezentujący widok Portiera.
 */
const Portier = () => {
  return (
    <Box>
      <div>
        <UsersTable />
      </div>
    </Box>
  );
};

export default Portier;
