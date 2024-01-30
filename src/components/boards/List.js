import React, { useState } from 'react';
import { Card } from './Card';
import { AddCard } from './AddCard';

// List component represents a list with cards
export const List = ({ listName, onUpdateListName, listCards }) => {
  // State to manage the cards in the list
  const [cards, setCards] = useState(listCards ?? []);
  // Function to add a new card to the list
  const addCard = (newCardTitle) => {
    setCards([...cards, { title: newCardTitle }]);
  };

  // Function to update the title of a card in the list
  const updateCardTitle = (index, newTitle) => {
    const updatedCards = [...cards];
    updatedCards[index].title = newTitle;
    setCards(updatedCards);
  };

  // Function to update the description of a card in the list
  const updateCardDescription = (index, newDescription) => {
    const updatedCards = [...cards];
    updatedCards[index].description = newDescription;
    setCards(updatedCards);
  };

  // Handler for updating the name of the list
  const handleNameChange = (e) => {
    onUpdateListName(e.target.value);
  };

  return (
    // Container for the list with styling
    <div className='w-64 h-min bg-white rounded-xl p-4 m-3'>
      {/* Input field for the list name */}
      <label>
        <input
          className="font-bold bg-transparent outline-none rounded-xl pl-2 text-indigo-600 "
          type="text"
          value={listName}
          onChange={handleNameChange}
        />
      </label>
      
      {/* Mapping through cards and rendering each "Card" component */}
      {cards.map((card, index) => (
        <Card key={index} 
              card={card} 
              onUpdateCardTitle={(newTitle) => updateCardTitle(index, newTitle)} 
              onUpdateCardDescription={(newDescription) => updateCardDescription(index, newDescription)} />
      ))}
      
      {/* "AddCard" component for adding new cards to the list */}
      <AddCard onAddCard={addCard} />
    </div>
  );
};
