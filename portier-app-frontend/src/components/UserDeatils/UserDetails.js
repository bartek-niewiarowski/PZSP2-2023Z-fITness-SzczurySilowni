// UserProfile.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import MyData from '../MyData/MyData';

const UserDetails = ({ users }) => {
  const { userId } = useParams();

  return (
    <div>
      <h2>Profil użytkownika: {userId}</h2>
      <MyData/>
    </div>
  );
};

export default UserDetails;
