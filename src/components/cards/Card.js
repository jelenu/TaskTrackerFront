import React, { useState } from 'react';
import { XMarkIcon } from "@heroicons/react/20/solid";

export const Card = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <button onClick={handleButtonClick} className='bg-slate-100 mt-3 rounded-xl h-9 pl-2 flex items-center w-full'>
        <p>Card</p>
      </button>

      {showPopup && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg relative w-1/3'>
            <div className="flex items-center justify-between mb-4">
              <label className="flex-1"> {/* Ajusta el ancho del label */}
                <input
                  className="font-bold bg-transparent outline-none border-transparent rounded-xl pl-2 focus:bg-white border-2 focus:border-sky-500 w-full" 
                  type="text"
                  placeholder="Escribe aquí"
                />
              </label>
              <button className="relative top-0 right-0" onClick={handleButtonClick}>
                <XMarkIcon className="h-6 w-6 text-black " />
              </button>
            </div>
            <div className="flex">
              <p>fsdfd</p>
              <p>fsdfd</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
