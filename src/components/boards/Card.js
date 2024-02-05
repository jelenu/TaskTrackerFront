import React, { useState } from 'react';
import { CardInfo } from './CardInfo';

export const Card = ({ card, onUpdateCardTitle, onUpdateCardDescription, snapshot }) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleButtonClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div
      className={` hover:bg-gray-200 text-indigo-600 mt-3 rounded-xl h-9 pl-2 flex items-center w-full ${
        snapshot.isDragging ? 'bg-gray-200 rotate-6' : ''
      }`}
    >
      <p>{card.title}</p>
    </div>
  );
};
