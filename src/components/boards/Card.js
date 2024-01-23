import React, { useState } from 'react';
import {CardInfo} from './CardInfo';

export const Card = ({ cardName, onUpdateCardName }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <button onClick={handleButtonClick} className='bg-white hover:bg-indigo-100 text-indigo-600 mt-3 rounded-xl h-9 pl-2 flex items-center w-full'>
        <p>{cardName}</p>
      </button>

      {showPopup && (
        <CardInfo cardName={cardName} onUpdateCardName={onUpdateCardName} onClose={handleButtonClick} />
      )}
    </>
  );
};