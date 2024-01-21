import React, { useState } from 'react';
import { Card } from './Card';
import { AddCard } from './AddCard';

// List component represents a list with cards
export const List = ({ listName, onUpdateListName }) => {
  // State to manage the cards in the list
  const [cards, setCards] = useState([]);

  // Function to add a new card to the list
  const addCard = (newCardName) => {
    setCards([...cards, { name: newCardName }]);
  };

  // Function to update the name of a card in the list
  const updateCardName = (index, newName) => {
    const updatedCards = [...cards];
    updatedCards[index].name = newName;
    setCards(updatedCards);
  };

  // Handler for updating the name of the list
  const handleNameChange = (e) => {
    onUpdateListName(e.target.value);
  };

  return (
    // Container for the list with styling
    <div className='w-64 bg-indigo-600 rounded-xl p-4 m-3'>
      {/* Input field for the list name */}
      <label>
        <input
          className="font-bold bg-transparent outline-none rounded-xl pl-2 text-white focus:ng focus:text-black"
          type="text"
          value={listName}
          onChange={handleNameChange}
        />
      </label>
      
      {/* Mapping through cards and rendering each "Card" component */}
      {cards.map((card, index) => (
        <Card key={index} cardName={card.name} onUpdateCardName={(newName) => updateCardName(index, newName)} />
      ))}
      
      {/* "AddCard" component for adding new cards to the list */}
      <AddCard onAddCard={addCard} />
    </div>
  );
};
