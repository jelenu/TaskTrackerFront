import React, {useEffect } from "react";
import { AddList } from "./AddList";
import { List } from "./List";
import { useState } from "react";
import useTokenVerifyRefresh from '../hooks/useTokenVerifyRefresh';


export const Board = () => {
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
  
  
  const [boards, setBoards] = useState([]);
  const { verifyToken } = useTokenVerifyRefresh();


  useEffect(() => {
    const fetchBoards = async () => {
      try {
        if (verifyToken()){
          const token = localStorage.getItem('token');

          const response = await fetch('http://localhost:8000/boards/', {
            method: 'GET',
            headers: {
              'Authorization': `JWT ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setBoards(data);
            
          } else {
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

  console.log(boards);


  return (
    <>
      {/* Container for lists and the "AddList" component */}
      <div className="flex m-5">
        {/* Mapping through lists and rendering each "List" component */}
        {lists.map((list, index) => (
          <List
            key={index}
            listName={list.name}
            onUpdateListName={(newName) => updateListName(index, newName)}
          />
        ))}

        {/* "AddList" component to add new lists */}
        <AddList onAddList={addList} />
      </div>
    </>
  );
};
