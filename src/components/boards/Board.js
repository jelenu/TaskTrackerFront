import React, {useEffect } from "react";
import { AddList } from "./AddList";
import { List } from "./List";
import { useState } from "react";
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


  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const isAuthenticated = await verifyToken();
          if (isAuthenticated) {
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
              console.error('Error al obtener los boards');
            }
          }else{

          }
        
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchBoards();
    // eslint-disable-next-line
  }, []);

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
    </div>
  </>
  );
};
