import React, {useEffect } from "react";
import { AddList } from "./AddList";
import { List } from "./List";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import useTokenVerifyRefresh from '../hooks/useTokenVerifyRefresh';
import { useUpdate } from '../context/UpdateContext';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


export const Board = ({board, onUpdateBoardName}) => {
  // State to manage the lists
  const [lists, setLists] = useState([]);
  const { addUpdate, setIsCreate } = useUpdate();
  const { verifyToken } = useTokenVerifyRefresh();
  const { isLogged } = useUser();


  // Function to update the name of a list
  const updateListName = (listId, newName) => {
    const updatedList = lists.map((list) =>
      list.id === listId ? { ...list, name: newName } : list);
    setLists(updatedList);
    addUpdate('List', {id: listId, name: newName});

  };
  
  


  const fetchBoards = async () => {
    try {
        if (isLogged && board.id) {
          const token = localStorage.getItem('token');

          const response = await fetch('http://localhost:8000/boards/'+board.id, {
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
    try {
      const order = lists.length;
      addUpdate('List', { name: newListName, order: order , board_id: board.id, create: true });
      setIsCreate(true);
      await new Promise(resolve => setTimeout(resolve, 50));
      await fetchBoards();
    }catch(error){
      console.error("Error adding board:", error);
    }
  };
  const handleNameChange = (e) => {
    onUpdateBoardName(e.target.value);
  };


  console.log(lists)

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...lists];

      const listSourceIndex = source.index;
      const listDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(listSourceIndex, 1);
      reorderedStores.splice(listDestinatonIndex, 0, removedStore);

      return setLists(reorderedStores);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const listSourceIndex = lists.findIndex(
      (list) => list.id === source.droppableId
    );
    const listDestinationIndex = lists.findIndex(
      (list) => list.id === destination.droppableId
    );

    const newSourceItems = [...lists[listSourceIndex].cards];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...lists[listDestinationIndex].cards]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...lists];

    newStores[listSourceIndex] = {
      ...lists[listSourceIndex],
      cards: newSourceItems,
    };
    newStores[listDestinationIndex] = {
      ...lists[listDestinationIndex],
      cards: newDestinationItems,
    };

    setLists(newStores);
  };


  return (
    <div className="layout__wrapper">
      <div className="">
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <div className="w-72">
            <label>
              <input
                className="font-extrabold text-center bg-indigo-500 outline-none focus:bg-indigo-400 text-white w-full h-full p-4 "
                type="text"
                value={board.name}
                onChange={handleNameChange}
              />
            </label>
          </div>
          <div className="flex m-5">
            <Droppable droppableId="ROOT" type="group" direction="horizontal">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="flex">
                  {lists.map((list, index) => (
                    <Draggable
                      draggableId={list.id}
                      index={index}
                      key={list.id}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <List
                            key={list.id}
                            list={list}
                            onUpdateListName={(newName) => updateListName(list.id, newName)}
                            fetchBoards={fetchBoards}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {/* "AddList" component to add new lists */}
            <AddList onAddList={addList} />
          </div>
        </DragDropContext>
        
      </div>
    </div>
  );
};
