import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useUser } from '../context/UserContext';

export const Login = ({ onToggleForm, closePopup, setIsEditing }) => {
  const { login } = useUser();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/auth/jwt/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        console.error('Error en la solicitud:', response.status);
        return;
      }
  
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      

      localStorage.setItem('token', data.access);
      localStorage.setItem('refresh-token', data.refresh);
      login();
  
      closePopup();
      setIsEditing && setIsEditing(false);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  

  return (
    <div>
      <div className="fixed inset-0 bg-gray-500 flex items-center justify-center">
        <div className="bg-white p-4 sm:p-8 w-full max-w-md rounded-lg relative">
          <button onClick={() => { closePopup(); setIsEditing && setIsEditing(false) }} className="absolute top-0 right-0 p-2 sm:p-4">
            <XMarkIcon className="h-6 w-6 text-black" />
          </button>

          <div className="flex min-h-full flex-1 flex-col justify-center px-4 sm:px-6 py-6 sm:py-12">
            <div className="mx-auto w-32 sm:w-full">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </div>

            <div className="mt-6 sm:mt-10 mx-4 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Dirección de correo electrónico
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Contraseña
                    </label>
                    <div className="text-sm">
                      <a
                        href="/"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>

              <p className="mt-4 sm:mt-6 text-center text-sm text-gray-500">
                ¿No eres miembro?{" "}
                <button
                  onClick={() => onToggleForm()}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Crea una cuenta
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
