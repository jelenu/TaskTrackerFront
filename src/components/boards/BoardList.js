import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import useTokenVerifyRefresh from "../hooks/useTokenVerifyRefresh";
import { Board } from "./Board";
import { AddBoard } from "./AddBoard";
import { useUpdate } from '../context/UpdateContext';

export const BoardList = () => {
  const { verifyToken } = useTokenVerifyRefresh();
  const { isLogged } = useUser();
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const { addUpdate, handleUpdate } = useUpdate();

  const fetchBoardsList = async () => {
    try {
      if (isLogged) {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8000/boards-list/", {
          method: "GET",
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBoards(data);
        } else {
          if (response.status === 401) {
            const tokenRefreshed = await verifyToken();
            if (tokenRefreshed) {
              return fetchBoardsList();
            }
          }
          console.error("Error al obtener los boards");
        }
      } else {
        setBoards([
          { id: 1, name: "Elemento 1" },
          { id: 2, name: "Elemento 2" },
          { id: 3, name: "Elemento 3" },
        ]);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    fetchBoardsList();
    // eslint-disable-next-line
  }, []);

  const handleBoardClick = (boardId) => {
    setActiveBoardId(boardId);
  };

  const addBoard = async (newBoardName) => {
    try {
      addUpdate('Board', { name: newBoardName, create: true });
      await handleUpdate();  
      await new Promise(resolve => setTimeout(resolve, 50));
      await fetchBoardsList();
    } catch (error) {
      console.error("Error adding board:", error);
    }
  };

  return (
    <div className="flex">
      <aside className="w-64">
        <div className="bg-indigo-600 h-screen ">
          <h2 className="text-xl font-bold p-4 text-white text-center">
            Your Boards
          </h2>
          <div className="flex flex-col p-4">
            {boards.map((board) => (
              <button
                key={board.id}
                className={`bg-white text-indigo-600 hover:bg-gray-200 font-bold mb-4 rounded p-4 ${
                  activeBoardId === board.id ? "bg-gray-300 hover:bg-gray-300" : ""
                }`}
                onClick={() => handleBoardClick(board.id)}
              >
                <p>{board.name}</p>
              </button>
            ))}
          </div>
          <AddBoard onAddBoard={addBoard}/>
        </div>
      </aside>
      {activeBoardId !== null && <Board boardId={activeBoardId} />}
    </div>
  );
};
