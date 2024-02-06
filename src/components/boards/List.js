import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { AddCard } from './AddCard';
import { useUpdate } from '../context/UpdateContext';
import {Droppable, Draggable} from "react-beautiful-dnd"

// List component represents a list with cards
export const List = ({ list, onUpdateListName, fetchBoards, showPopup, setShowPopup }) => {
  // State to manage the cards in the list
  const [cards, setCards] = useState(list.cards ?? []);
  const { addUpdate, setIsCreate } = useUpdate();

  // Function to add a new card to the list
  const addCard = async (newCardTitle) => {
    try{
    addUpdate('Card', { title: newCardTitle, order: 0, list_id: list.id, create: true });
    setIsCreate(true);
    await new Promise(resolve => setTimeout(resolve, 50));
    await fetchBoards();

    }catch(error){
      console.error("Error adding board:", error);
    }
  };
  useEffect(() => {
    // Update local state 'cards' when 'list' prop changes
    setCards(list.cards ?? []);
  }, [list.cards]);
  
  

  // Function to update the title of a card in the list
  const updateCardTitle = (cardId, newTitle) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, title: newTitle } : card);
    setCards(updatedCards);
    addUpdate('Card', { id:cardId, title: newTitle });

  };

  // Function to update the description of a card in the list
  const updateCardDescription = (cardId, newDescription) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, description: newDescription } : card);
    setCards(updatedCards);
    addUpdate('Card', { id:cardId, description: newDescription });

  };

  // Handler for updating the name of the list
  const handleNameChange = (e) => {
    onUpdateListName(e.target.value);
  };

  return (
    // Container for the list with styling
    <div className='w-64 h-min bg-white rounded-xl p-4 m-3'>
      <Droppable droppableId={list.id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="list-container">
            <label>
              <input
                className="font-bold bg-transparent outline-none rounded-xl pl-2 text-indigo-600 "
                type="text"
                value={list.name}
                onChange={handleNameChange}
              />
            </label>
          </div>
          <div className="cards-container">
            {list.cards.map((card, index) => (
              <Draggable 
                draggableId={card.id} 
                index={index} 
                key={card.id} 
                isDragDisabled={showPopup}>
                {(provided, snapshot) => (
                  <div
                    className="card-container"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <Card 
                      key={index} 
                      card={card} 
                      onUpdateCardTitle={(newTitle) => updateCardTitle(card.id, newTitle)} 
                      onUpdateCardDescription={(newDescription) => updateCardDescription(card.id, newDescription)}
                      snapshot={snapshot}
                      showPopup={showPopup}
                      setShowPopup={setShowPopup}

                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
          {/* "AddCard" component for adding new cards to the list */}
      <AddCard onAddCard={addCard} />
        </div>
      )}
    </Droppable>

    </div>
  );
};