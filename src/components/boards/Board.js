import React, {useEffect } from "react";
import { AddList } from "./AddList";
import { List } from "./List";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import useTokenVerifyRefresh from '../hooks/useTokenVerifyRefresh';

export const Board = ({boardId}) => {
  // State to manage the lists
  const [lists, setLists] = useState([]);

  // Function to add a new list
  const addList = (newListName) => {
    setLists([...lists, { name: newListName }]);
  };

  // Function to update the name of a list
  const updateListName = (index, newName) => {
    const updatedLists = [...lists];
    updatedLists[index].name = newName;
    setLists(updatedLists);
  };
  
  const { verifyToken } = useTokenVerifyRefresh();
  const { isLogged } = useUser();


  useEffect(() => {
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

    fetchBoards();
    // eslint-disable-next-line
  }, []);
  console.log(lists)

  const [updateData, setUpdateData] = useState({
    Board: [{ id: 1, name: 'NuevoNombre2' }],
    List: [{ id: 1, name: 'NuevoNombreLista2', order: 2 },{ name: "aaaaaa", create: true, order: 2, board_id: 1 }],
    Card: [{ id: 1, title: 'NuevoTitulo2', description: 'NuevaDescripcion2', order: 2 }, { title: "aaaaaa", create: true, list_id: 1 }],
  });

  const handleUpdate = async () => {
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
  };





  return (
    <>
    {/* Container for lists and the "AddList" component */}
    <div className="flex m-5">
      {/* Checking if lists is not empty before mapping through it */}
      {lists && lists.length > 0 && lists.map((list, index) => (
        <List
          key={index}
          listName={list.name}
          listCards={list.cards}
          onUpdateListName={(newName) => updateListName(index, newName)}
        />
      ))}

      {/* "AddList" component to add new lists */}
      <AddList onAddList={addList} />
      <button onClick={handleUpdate}>Update Tasks</button>

    </div>
  </>
  );
};
