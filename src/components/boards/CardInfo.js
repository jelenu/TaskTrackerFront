import React from 'react';
import { XMarkIcon } from "@heroicons/react/20/solid";
 
export const CardInfo = ({ card, onUpdateCardTitle, onUpdateCardDescription, onClose }) => {
  console.log(card)
  const handleTitleChange = (e) => {
    onUpdateCardTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    onUpdateCardDescription(e.target.value);
  };

  return (
    <div className=' fixed inset-0 bg-gray-600 bg-opacity-20 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg relative w-1/3 z-0'>
        <div className="flex items-center justify-between mb-4">
          <label className="flex-1 -ml-3 mr-16">
            <input
              className="font-bold bg-transparent  text-indigo-600 outline-none  rounded-xl pl-2 border-2 border-transparent focus:border-indigo-600  w-full" 
              type="text"
              value={card.title}
              onChange={handleTitleChange}
            />
          </label>
          <button className="relative top-0 right-0" onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-indigo-600 " />
          </button>
        </div>
        <div className="flex justify-between">
          <div className="mb-4 w-4/6 ">
            <p className='mb-2 font-semibold text-indigo-600'>Descripción</p>
            <textarea
              className="outline-none border-2 rounded-xl pl-2 text-indigo-600 hover:bg-gray-200   resize-none w-full h-20 mb-10" 
              value={card.description}
              onChange={handleDescriptionChange}
            />
            
          </div>
          <div className="text-indigo-600">
            <p>Miembros</p>
          </div>
        </div>
      </div>
    </div>
  )
}
