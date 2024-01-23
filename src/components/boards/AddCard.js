import React, { useState } from 'react';
import { PlusIcon } from "@heroicons/react/20/solid";

// AddCard component for adding new cards to the list
export const AddCard = ({ onAddCard }) => {
  // State to manage the editing state and new card name
  const [isEditing, setIsEditing] = useState(false);
  const [newCardName, setNewCardName] = useState('');

  // Handler to switch to editing mode
  const handleAddCard = () => {
    setIsEditing(true);
  };

  // Handler to save the new card and exit editing mode
  const handleSaveCard = () => {
    if (newCardName.trim() !== '') {
      onAddCard(newCardName);
      setNewCardName('');
      setIsEditing(false);
    }
  };

  return (
    <div>
      {/* Conditional rendering based on editing state */}
      {isEditing ? (
        <div>
          {/* Input field for new card name */}
          <input
            type="text"
            placeholder="Enter card name"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
            className='outline-none rounded-xl pl-2 mt-2 h-9 bg-white border-2  border-indigo-600 w-full'
          />
          
          {/* Button to save the new card */}
          <button
            onClick={handleSaveCard}
            className='bg-indigo-600 text-white font-semibold mt-3 rounded-xl h-9 p-2 flex items-center'
          >
            <p>Save Card</p>
          </button>
        </div>
      ) : (
        // Button to initiate editing mode
        <button
          onClick={handleAddCard}
          className=' mt-3 h-9 pl-2 flex items-center w-full'
        >
          {/* Plus icon and text for adding a new card */}
          <p className='flex text-indigo-600 font-semibold'><PlusIcon className="h-6 w-6 " /> Add New Card</p>
        </button>
      )}
    </div>
  );
};
