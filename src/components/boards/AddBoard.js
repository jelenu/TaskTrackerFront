import React, {useState} from 'react'
import { PlusIcon } from "@heroicons/react/20/solid";
import { useUpdate } from '../context/UpdateContext';

export const AddBoard = ({ onAddBoard }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newBoardName, setNewBoardName] = useState('');
    const { addUpdate } = useUpdate();

    const handleAddBoard = () => {
      setIsEditing(true);
    };
  
    const handleSaveBoard = () => {
      if (newBoardName.trim() !== '') {
        onAddBoard(newBoardName);
        setNewBoardName('');
        
        addUpdate('Board', { name: newBoardName, create: true });
        
        setIsEditing(false);
      }
    };
    

    



    return (
      <div className='flex items-center justify-center'>
        {isEditing ? (
          <div className='bg-white rounded-xl p-4 m-3'>
            <input
              type="text"
              placeholder="Enter Board name"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              className='bg-transparent outline-none  rounded-xl pl-2 mt-2 h-9 border-2 text-black border-indigo-600'
            />
            <button
              onClick={handleSaveBoard}
              className=' bg-indigo-600 hover:bg-indigo-500 text-white mt-3 rounded-xl h-9 p-2 flex items-center'
            >
              <p>Save Board</p>
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddBoard}
          >
            <p className='flex text-white hover:text-gray-300'><PlusIcon className="h-6 w-6" /> Add New Board</p>
          </button>
        )}
      </div>
    );
  };
  