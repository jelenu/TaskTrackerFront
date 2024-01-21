import React from 'react';
import { XMarkIcon } from "@heroicons/react/20/solid";
 
export const CardInfo = ({ cardName, onUpdateCardName, onClose }) => {

  const handleNameChange = (e) => {
    onUpdateCardName(e.target.value);
  };

  return (
    <div className=' fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg relative w-1/3 z-0'>
        <div className="flex items-center justify-between mb-4">
          <label className="flex-1 -ml-3">
            <input
              className="font-bold bg-transparent outline-none border-transparent rounded-xl pl-2 focus:bg-white border-2 focus:border-sky-500 w-full" 
              type="text"
              value={cardName}
              onChange={handleNameChange}
            />
          </label>
          <button className="relative top-0 right-0" onClick={onClose}>
            <XMarkIcon className="h-6 w-6 text-black " />
          </button>
        </div>
        <div className="flex justify-between">
          <div className="mb-4 w-4/6 ">
            <p className='mb-2'>Descripción</p>
            <textarea
              className="outline-none bg-gray-100 border-transparent rounded-xl pl-2 hover:bg-gray-200 border-2 focus:border-sky-500  resize-none w-full h-20 mb-10" 
              placeholder="Escribe tu descripción aquí"
            />
            <p className='mb-2'>Comentarios</p>
            <textarea
              className="outline-none bg-gray-100 border-transparent rounded-xl pl-2 hover:bg-gray-200 border-2 focus:border-sky-500  resize-none w-full h-20 mb-10" 
              placeholder="Provisional"
            />
          </div>
          <div className="">
            <p>Miembros</p>
          </div>
        </div>
      </div>
    </div>
  )
}
