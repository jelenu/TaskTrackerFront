import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useUser } from "../context/UserContext";

export const Register = ({ onToggleForm, closePopup, setIsEditing }) => {
  const { login } = useUser();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
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
      // Primera llamada para registrar al usuario
      const registerResponse = await fetch(
        "http://localhost:8000/auth/users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!registerResponse.ok) {
        console.error(
          "Error en la solicitud de registro:",
          registerResponse.status
        );
        return;
      }

      const registerData = await registerResponse.json();
      console.log("Respuesta del servidor (registro):", registerData);

      // Segunda llamada para obtener el token
      try {
        const loginFormData = {
          email: formData.email,
          password: formData.password,
        };

        const loginResponse = await fetch(
          "http://localhost:8000/auth/jwt/create/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginFormData),
          }
        );

        if (!loginResponse.ok) {
          console.error(
            "Error en la solicitud de inicio de sesión:",
            loginResponse.status
          );
          return;
        }

        const loginData = await loginResponse.json();
        console.log("Respuesta del servidor (inicio de sesión):", loginData);

        localStorage.setItem("token", loginData.token);
        localStorage.setItem("refresh-token", loginData["refresh-token"]);
        login();

      } catch (loginError) {
        console.error(
          "Error al realizar la solicitud de inicio de sesión:",
          loginError
        );
      }

      closePopup();
      setIsEditing && setIsEditing(false);

    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-500 flex items-center justify-center">
        <div className="bg-white p-8 w-full max-w-md rounded-lg relative">
          <button onClick={() => { closePopup(); setIsEditing && setIsEditing(false) }} className="absolute top-0 right-0 p-4">
            <XMarkIcon className="h-6 w-6 text-black" />
          </button>

          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
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
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 pl-2 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password_confirm"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password_confirm"
                      name="password_confirm"
                      type="password"
                      value={formData.password_confirm}
                      onChange={handleChange}
                      autoComplete="new-password"
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
                    Register
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  onClick={() => onToggleForm()}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
