import React, { useState } from 'react';

export const AddCard = ({ onAddCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newCardName, setNewCardName] = useState('');

  const handleAddCard = () => {
    setIsEditing(true);
  };

  const handleSaveCard = () => {
    if (newCardName.trim() !== '') {
      onAddCard(newCardName);
      setNewCardName('');
      setIsEditing(false);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            placeholder="Enter card name"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
            className='bg-transparent outline-none border-transparent rounded-xl pl-2 mt-2 h-10 bg-white border-2 border-sky-500 w-full'
          />
          <button
            onClick={handleSaveCard}
            className=' bg-sky-500 mt-3 rounded-xl h-9 p-2 flex items-center'
          >
            <p>Save Card</p>
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddCard}
          className='bg-slate-100 mt-3 rounded-xl h-9 pl-2 flex items-center w-full'
        >
          <p>{ 'Add Card'}</p>
        </button>
      )}
    </div>
  );
};
