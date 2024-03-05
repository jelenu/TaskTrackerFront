import React, { useEffect, useState } from 'react';
import "./App.css";
import Header from "./components/Layout/Header";
import { BoardList } from "./components/boards/BoardList";
import { useUser } from './components/context/UserContext';
import useTokenVerifyRefresh from './components/hooks/useTokenVerifyRefresh';
import { UpdateProvider } from './components/context/UpdateContext';

function App() {
  const { verifyToken } = useTokenVerifyRefresh();
  const { login, logout } = useUser();
  const [verifyTokenCompleted, setVerifyTokenCompleted] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isAuthenticated = await verifyToken();
      if (isAuthenticated) {
        login();
      } else {
        logout();
      }
      setVerifyTokenCompleted(true);
    };
    checkLoginStatus();
    // eslint-disable-next-line
  }, []);

  if (!verifyTokenCompleted) {
    // Evitar ejecutar el bloque siguiente hasta que verifyToken haya terminado
    return null;
  }

  return (
    <div className="bg-gray-200">
        <Header />
        <UpdateProvider>
          <BoardList/>
        </UpdateProvider>
    </div>
  );
}

export default App;
