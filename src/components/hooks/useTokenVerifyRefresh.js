import { useState } from 'react';

const useTokenVerifyRefresh = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [refresh] = useState(localStorage.getItem('refresh-token') || null);
  const [refreshAttempted, setRefreshAttempted] = useState(false);

  const verifyToken = async () => {
    try {

      const verifyResponse = await fetch('http://localhost:8000/auth/jwt/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      });
      if (verifyResponse.ok) {
        return true;
      } else if (!refreshAttempted) {
        setRefreshAttempted(true);
        await refreshToken();
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
    } finally {
    }
  };

  const refreshToken = async () => {
    try {

      const refreshResponse = await fetch('http://localhost:8000/auth/jwt/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refresh }),
      });

      if (refreshResponse.ok) {
        const newToken = await refreshResponse.json();
        setToken(newToken.access);
        localStorage.setItem('token', newToken.access);
        return true;
      }
    } catch (error) {
      console.error('Error al actualizar el token:', error);
    } finally {
    }
  };
  return { verifyToken };
};

export default useTokenVerifyRefresh;