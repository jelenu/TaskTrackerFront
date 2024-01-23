import React, { useState } from 'react';
import { PlusIcon } from "@heroicons/react/20/solid";

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
        <div className='bg-white rounded-xl p-4 m-3'>
          <input
            type="text"
            placeholder="Enter list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className='bg-transparent outline-none  rounded-xl pl-2 mt-2 h-9 border-2 text-black border-indigo-600 w-64'
          />
          <button
            onClick={handleSaveList}
            className=' bg-indigo-600 hover:bg-indigo-500 text-white mt-3 rounded-xl h-9 p-2 flex items-center'
          >
            <p>Save List</p>
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddList}
          className=' mt-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl h-9 p-2 flex items-center w-64 '
        >
          <p className='flex text-white'><PlusIcon className="h-6 w-6" /> Add New List</p>
        </button>
      )}
    </div>
  );
};
