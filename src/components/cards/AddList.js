import React, { useState } from 'react';

export const AddList = ({ onAddList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleAddList = () => {
    setIsEditing(true);
  };

  const handleSaveList = () => {
    if (newListName.trim() !== '') {
      onAddList(newListName);
      setNewListName('');
      setIsEditing(false);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div >
          <input
            type="text"
            placeholder="Enter list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className='bg-transparent outline-none border-transparent rounded-xl pl-2 mt-2 h-10 bg-white border-2 border-sky-500 w-full'
          />
          <button
            onClick={handleSaveList}
            className=' bg-sky-500 mt-3 rounded-xl h-9 p-2 flex items-center'
          >
            <p>Save List</p>
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddList}
          className='bg-slate-100 mt-3 rounded-xl h-9 p-2 flex items-center w-full'
        >
          <p>{'Add List'}</p>
        </button>
      )}
    </div>
  );
};
