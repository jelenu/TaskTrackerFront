import React, { useState } from 'react';
import { CardInfo } from './CardInfo';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const Card = ({ card, onUpdateCardTitle, onUpdateCardDescription }) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleButtonClick = () => {
    setShowPopup(!showPopup);
  };
  
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.order });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        style={style}
        ref={setNodeRef} 
        {...attributes}
        {...listeners}
        className='bg-white hover:bg-gray-200 text-indigo-600 mt-3 rounded-xl h-9 pl-2 flex items-center w-full'
      >
        <p>{card.title}</p>
      </div>

      {showPopup && (
        <CardInfo card={card} onUpdateCardTitle={onUpdateCardTitle} onUpdateCardDescription={onUpdateCardDescription} onClose={handleButtonClick} />
      )}
    </>
  );
};
