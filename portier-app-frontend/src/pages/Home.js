import React from 'react';
import { Box } from '@mui/system';
import UsersTable from '../components/UsersTable/UsersTable.js';

const Home = () => {
  const users = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
    { id: 3, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { id: 4, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
    { id: 5, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { id: 6, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
    { id: 7, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { id: 8, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
    { id: 9, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { id: 10, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
    // Dodaj więcej użytkowników według potrzeb
  ];
  return (
    <Box>
      <div>
        <UsersTable users = {users} />
      </div>
    </Box>
  );
};

export default Home;
