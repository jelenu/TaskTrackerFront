import React, { useState } from 'react';
import { ListTitle } from './ListTitle';
import { Card } from './Card';
import { AddCard } from './AddCard';

export const List = () => {
  const [cards, setCards] = useState([]);

  const addCard = (newCardName) => {
    setCards([...cards, { name: newCardName }]);
  };

  const updateCardName = (index, newName) => {
    const updatedCards = [...cards];
    updatedCards[index].name = newName;
    setCards(updatedCards);
  };

  return (
    <div className='w-64 bg-gray-200 rounded-xl p-4 m-3'>
      <ListTitle />
      {cards.map((card, index) => (
        <Card key={index} cardName={card.name} onUpdateCardName={(newName) => updateCardName(index, newName)} /> 
      ))}
      <AddCard onAddCard={addCard} />
    </div>
  );
};