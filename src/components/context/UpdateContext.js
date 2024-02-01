import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from "../context/UserContext";
import useTokenVerifyRefresh from '../hooks/useTokenVerifyRefresh';

const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [updateData, setUpdateData] = useState({
    Board: [],
    List: [],
    Card: [],
  });

  const [hasChanges, setHasChanges] = useState(false);


  const addUpdate = (type, data) => {
    setUpdateData(prevData => ({
      ...prevData,
      [type]: [...prevData[type], data],
    }));
    setHasChanges(true);
  };

  const { verifyToken } = useTokenVerifyRefresh();
  const { isLogged } = useUser();

  const handleUpdate = useCallback(async () => {
    try {
      if (isLogged) {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8000/update/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
          body: JSON.stringify(updateData),
        });

        if (response.ok) {
          console.log('Updates successful');
          // Limpiar los datos después de una actualización exitosa
          setUpdateData({
            Board: [],
            List: [],
            Card: [],
          });
          setHasChanges(false);
        } else {
            if (response.status === 401) {
                const tokenRefreshed = await verifyToken();
                if (tokenRefreshed) {
                  return handleUpdate();
                }
              }
          console.error('Error updating data');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [isLogged, updateData, verifyToken]);

  useEffect(() => {
    if(hasChanges){
      const handler = setTimeout(() => {handleUpdate();
      }, 1000);
      return() =>  {
        clearTimeout(handler);
      }
    } 
  }, [hasChanges, updateData, handleUpdate]);

  return (
    <UpdateContext.Provider value={{ addUpdate, handleUpdate }}>
      {children}
    </UpdateContext.Provider>
  );
};

export const useUpdate = () => {
  return useContext(UpdateContext);
};
