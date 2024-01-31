import React, {useEffect } from "react";
import { AddList } from "./AddList";
import { List } from "./List";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import useTokenVerifyRefresh from '../hooks/useTokenVerifyRefresh';
import { useUpdate } from '../context/UpdateContext';


export const Board = ({boardId}) => {
  // State to manage the lists
  const [lists, setLists] = useState([]);
  const { addUpdate, handleUpdate } = useUpdate();


  // Function to update the name of a list
  const updateListName = (index, newName) => {
    const updatedLists = [...lists];
    updatedLists[index].name = newName;
    setLists(updatedLists);
  };
  
  const { verifyToken } = useTokenVerifyRefresh();
  const { isLogged } = useUser();


  const fetchBoards = async () => {
    try {
        if (isLogged && boardId) {
          const token = localStorage.getItem('token');

          const response = await fetch('http://localhost:8000/boards/'+boardId, {
            method: 'GET',
            headers: {
              'Authorization': `JWT ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setLists(data.lists);
          } else {
            if (response.status === 401) {
              const tokenRefreshed = await verifyToken();
              if (tokenRefreshed) {
                return fetchBoards();
              }
            }
            console.error('Error al obtener los boards');
          }
        }
      
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  useEffect(() => {
    fetchBoards();
    // eslint-disable-next-line
  }, []);

  const addList = async (newListName) => {
    addUpdate('List', { name: newListName, order: 0, board_id: boardId, create: true });
    await handleUpdate();
    await new Promise(resolve => setTimeout(resolve, 50));
    await fetchBoards();
  };

  return (
    <>
    {/* Container for lists and the "AddList" component */}
    <div className="flex m-5">
      {/* Checking if lists is not empty before mapping through it */}
      {lists && lists.length > 0 && lists.map((list) => (
        <List
          key={list.id}
          list={list}
          onUpdateListName={(newName) => updateListName(list.id, newName)}
          fetchBoards={fetchBoards}
        />
      ))}

      {/* "AddList" component to add new lists */}
      <AddList onAddList={addList} />
    </div>
  </>
  );
};
