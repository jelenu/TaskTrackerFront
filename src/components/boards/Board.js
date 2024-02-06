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
  const [showPopup, setShowPopup] = useState(false);

  console.log(lists)
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


  const handleDragAndDrop = (results) => {
    // Destructure properties from the 'results' object
    const { source, destination, type } = results;
    console.log(results); // Log the drag and drop results

    // If destination is falsy, do nothing
    if (!destination) return;

    // If the card is dropped in the same position, do nothing
    if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
    )
        return;

    // If changing the order of lists
    if (type === "group") {
        // Create a copy of the lists
        const reorderedLists = [...lists];

        // Obtain the source and destination index for lists
        const listSourceIndex = source.index;
        const listDestinatonIndex = destination.index;

        // Reorder the lists
        const [removedList] = reorderedLists.splice(listSourceIndex, 1);
        reorderedLists.splice(listDestinatonIndex, 0, removedList);

        // Save the reordered lists locally
        setLists(reorderedLists);

        // Save the reordered lists to the API
        reorderedLists.forEach((list, index) => {
            addUpdate('List', { id: list.id, order: index });
        });

        return;
    }

    // Obtain source and destination card index
    const cardSourceIndex = source.index;
    const cardDestinationIndex = destination.index;

    // Obtain source and destination list indices
    const listSourceIndex = lists.findIndex(
        (list) => list.id === source.droppableId
    );
    const listDestinationIndex = lists.findIndex(
        (list) => list.id === destination.droppableId
    );

    // Copy source and destination cards
    const newSourceCards = [...lists[listSourceIndex].cards];
    const newDestinationCards =
        source.droppableId !== destination.droppableId
            ? [...lists[listDestinationIndex].cards]
            : newSourceCards;

    // Remove the card from the source and add it to the destination
    const [deletedCard] = newSourceCards.splice(cardSourceIndex, 1);
    newDestinationCards.splice(cardDestinationIndex, 0, deletedCard);

    // Create a copy of the lists
    const newLists = [...lists];

    // Update the source and destination lists with the new cards
    newLists[listSourceIndex] = {
        ...lists[listSourceIndex],
        cards: newSourceCards,
    };
    newLists[listDestinationIndex] = {
        ...lists[listDestinationIndex],
        cards: newDestinationCards,
    };
    
    // Save reordered lists locally
    setLists(newLists);
    // Save reordered lists to the API
    newLists[listSourceIndex].cards.forEach((card, index) => {
      addUpdate('Card', { id: card.id, order: index });
    });

    // If card move to other list
    if(listSourceIndex !== listDestinationIndex){

      // Save reordered destination list to the API
      newLists[listDestinationIndex].cards.forEach((card, index) => {
        
        // Save moved card to the new list in the API
        if(cardDestinationIndex === index){
          addUpdate('Card', { id: card.id, order: index, list_id: newLists[listDestinationIndex].id });
        }
      });
    } 
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
                      isDragDisabled={showPopup}
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
                            showPopup={showPopup}
                            setShowPopup={setShowPopup}
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
