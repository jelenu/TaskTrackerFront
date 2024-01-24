import { useState, useEffect } from 'react';

const useTokenRefresh = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [refreshToken] = useState(localStorage.getItem('refresh-token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAndRefreshToken = async () => {
      try {
        setLoading(true);

        // Verificar la validez del token
        const response = await fetch('http://localhost:8000/auth/jwt/verify/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          // Token válido, no hacemos nada
          setLoading(false);
          return;
        }

        // Si el token no es válido, intentamos refrescarlo
        const refreshResponse = await fetch('http://localhost:8000/auth/jwt/refresh/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (refreshResponse.ok) {
          // Si la actualización del token es exitosa, actualizamos el estado y almacenamos en el local storage
          const newToken = await refreshResponse.json();
          setToken(newToken.token);
          localStorage.setItem('token', newToken.token);
        }
      } catch (error) {
        console.error('Error al verificar/actualizar el token:', error);
      } finally {
        setLoading(false);
      }
    };

    verifyAndRefreshToken();
  }, [token, refreshToken]);

  return { token, refreshToken, loading };
};

export default useTokenRefresh;
