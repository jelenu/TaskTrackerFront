import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { AddCard } from './AddCard';
import { useUpdate } from '../context/UpdateContext';
import {DndContext, closestCenter} from '@dnd-kit/core'
import {SortableContext, verticalListSortingStrategy, arrayMove} from '@dnd-kit/sortable'



// List component represents a list with cards
export const List = ({ list, onUpdateListName, fetchBoards }) => {
  // State to manage the cards in the list
  const [cards, setCards] = useState(list.cards ?? []);
  const { addUpdate, setIsCreate } = useUpdate();

  // Function to add a new card to the list
  const addCard = async (newCardTitle) => {
    try{
    const order = cards.length;
    addUpdate('Card', { title: newCardTitle, order: order, list_id: list.id, create: true });
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


  const handleDragEnd = (event) => {
    const {active, over} = event;

    const oldIndex = cards.findIndex(card => card.order === active.id);
    const newIndex = cards.findIndex(card => card.order === over.id);
    const newOrder = arrayMove(cards, oldIndex, newIndex);

    // Actualizar el orden local y también hacer la llamada API para actualizar el orden en el servidor
    setCards(newOrder);
    newOrder.forEach(async (card, index) => {
      await addUpdate('Card', { id: card.id, order: index });
    });
  };


  return (
    // Container for the list with styling
    <div className='w-64 h-min bg-white rounded-xl p-4 m-3'>
      {/* Input field for the list name */}
      <label>
        <input
          className="font-bold bg-transparent outline-none rounded-xl pl-2 text-indigo-600 "
          type="text"
          value={list.name}
          onChange={handleNameChange}
        />
      </label>
      



      <DndContext 
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cards}
          strategy={verticalListSortingStrategy}
        >
          {cards.map((card, index) => (
            <Card 
              key={index} 
              card={card} 
              onUpdateCardTitle={(newTitle) => updateCardTitle(card.id, newTitle)} 
              onUpdateCardDescription={(newDescription) => updateCardDescription(card.id, newDescription)} 
            />
          ))}
        </SortableContext>
      </DndContext>









      {/* Mapping through cards and rendering each "Card" component */}
      
      
      {/* "AddCard" component for adding new cards to the list */}
      <AddCard onAddCard={addCard} />
    </div>
  );
};
