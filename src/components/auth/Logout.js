import React from 'react';
import { useUser } from '../context/UserContext';

export const Logout = () => {
  const { logout } = useUser();

  const handleLogout = () => {
    // Lógica de logout
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    logout(); // Asegúrate de llamar a tu función de logout si es necesario
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};