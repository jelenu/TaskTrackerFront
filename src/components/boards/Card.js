import { CardInfo } from './CardInfo';
import React, { useState } from 'react';

export const Card = ({ card, onUpdateCardTitle, onUpdateCardDescription, snapshot, showPopup, setShowPopup}) => {
  const [showThisPopup, setShowThisPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(!showPopup);
    setShowThisPopup(!showThisPopup);
  };

  return (
    <>
      <div 
      onClick={handleButtonClick}
        className={` font-bold text-white hover:bg-indigo-400 mt-3 rounded-xl h-9 pl-2 flex items-center w-11/12 ${
          snapshot.isDragging ? 'rotate-6 bg-indigo-400' : 'bg-indigo-500'
        }`}
      >
        <p>{card.title}</p>
      </div>
      {showThisPopup && (
        <CardInfo card={card} onUpdateCardTitle={onUpdateCardTitle} onUpdateCardDescription={onUpdateCardDescription} onClose={handleButtonClick} />
      )}
    </>
    
  );
};
