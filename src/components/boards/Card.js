import React, { useState } from 'react';
import {CardInfo} from './CardInfo';

export const Card = ({ card, onUpdateCardTitle, onUpdateCardDescription }) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleButtonClick = () => {
    setShowPopup(!showPopup);
  };
  return (
    <>
      <button onClick={handleButtonClick} className='bg-white hover:bg-gray-200 text-indigo-600 mt-3 rounded-xl h-9 pl-2 flex items-center w-full'>
        <p>{card.title}</p>
      </button>

      {showPopup && (
        <CardInfo card={card} onUpdateCardTitle={onUpdateCardTitle} onUpdateCardDescription={onUpdateCardDescription} onClose={handleButtonClick} />
      )}
    </>
  );
};