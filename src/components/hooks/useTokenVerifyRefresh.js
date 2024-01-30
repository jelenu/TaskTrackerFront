import { useState } from 'react';

const useTokenVerifyRefresh = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [refresh, setRefresh] = useState(localStorage.getItem('refresh-token') || null);
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
        const refreshSuccess = await refreshToken();
          if (refreshSuccess) {
            // Si el refresh tiene éxito, intenta nuevamente la verificación del token
            return true;
          }else {
            // Si el refresh no tiene éxito, elimina los tokens
            setToken(null);
            setRefresh(null);
            localStorage.removeItem('token');
            localStorage.removeItem('refresh-token');
          }
        
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
    }
  
    return false;
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
    }
  };
  return { verifyToken, refreshToken };
};

export default useTokenVerifyRefresh;
