import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { AddCard } from './AddCard';
import { useUpdate } from '../context/UpdateContext';
import {Droppable, Draggable} from "react-beautiful-dnd"
import { useUser } from "../context/UserContext";
import { v4 as uuidv4 } from 'uuid';

// List component represents a list with cards
export const List = ({ list, onUpdateListName, fetchBoards, showPopup, setShowPopup, setLists }) => {
  // State to manage the cards in the list
  const [cards, setCards] = useState(list.cards ?? []);
  const { addUpdate, setIsCreate } = useUpdate();
  const { isLogged } = useUser();

  // Function to add a new card to the list
  const addCard = async (newCardTitle) => {
    try {
      if (isLogged) {
        const order = cards.length;
        addUpdate('Card', { title: newCardTitle, order: order, list_id: list.id, create: true });
        setIsCreate(true);
        await new Promise(resolve => setTimeout(resolve, 50));
        await fetchBoards();
      } else {
        const order = cards.length;
        const newCard = { id: uuidv4(), title: newCardTitle, order: order, list_id: list.id };
  
        // Actualizar el estado de lists con la nueva tarjeta
        setLists(prevLists => {
          const updatedLists = prevLists.map(prevList => {
            if (prevList.id === list.id) {
              return {
                ...prevList,
                cards: [...prevList.cards, newCard]
              };
            }
            return prevList;
          });
          return updatedLists;
        });
      }
    } catch (error) {
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
    if(isLogged){
      addUpdate('Card', { id:cardId, title: newTitle });
    }
  };

  // Function to update the description of a card in the list
  const updateCardDescription = (cardId, newDescription) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, description: newDescription } : card);
    
    setCards(updatedCards);
    if(isLogged){
      addUpdate('Card', { id:cardId, description: newDescription });
    }
  };

  // Handler for updating the name of the list
  const handleNameChange = (e) => {
    onUpdateListName(e.target.value);
  };

  return (
    // Container for the list with styling
    <div className='w-64  bg-white rounded-xl p-4 m-3'>
      <Droppable droppableId={list.id}>
        {(provided) => (
          <div 
            className=""
            {...provided.droppableProps} 
            ref={provided.innerRef}
          >
            <div>
              <label>
                <input
                  className="font-bold bg-transparent outline-none rounded-xl pl-2 text-indigo-600 "
                  type="text"
                  value={list.name}
                  onChange={handleNameChange}
                />
              </label>
            </div>
            <div className='overflow-auto cards-max'>
              {list.cards && list.cards.map((card, index) => (
                <Draggable 
                  draggableId={card.id} 
                  index={index} 
                  key={card.id} 
                  isDragDisabled={showPopup}
                >
                  {(provided, snapshot) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <Card 
                        key={index} 
                        onUpdateCardTitle={(newTitle) => updateCardTitle(card.id, newTitle)} 
                        onUpdateCardDescription={(newDescription) => updateCardDescription(card.id, newDescription)}
                        card={card}
                        cardCopy={cards[index]}
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