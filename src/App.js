import React, { useEffect, useState } from 'react';
import "./App.css";
import Header from "./components/Layout/Header";
import { Board } from "./components/boards/Board";
import { useUser } from './components/context/UserContext';
import useTokenVerifyRefresh from './components/hooks/useTokenVerifyRefresh';

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
  }, []);

  if (!verifyTokenCompleted) {
    // Evitar ejecutar el bloque siguiente hasta que verifyToken haya terminado
    return null;
  }

  return (
    <div className="h-screen bg-gray-200">
      {/* Header component */}
      <Header />
      <Board/>
    </div>
  );
}

export default App;
