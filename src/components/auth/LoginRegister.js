import React, { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

export const LoginRegister = ({ openPopup, setIsEditing }) => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(openPopup);

  const handleToggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };

  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          {isLoginActive ? (
            <Login onToggleForm={handleToggleForm} closePopup={handleTogglePopup} setIsEditing={setIsEditing} />
          ) : (
            <Register onToggleForm={handleToggleForm}  closePopup={handleTogglePopup} setIsEditing={setIsEditing}/>
          )}
        </div>
      )}

      <button onClick={handleTogglePopup} className='hover:text-gray-300'>
    Login <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  );
};
