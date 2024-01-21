// Importing necessary components and styles
import './App.css';
import Header from "./components/Layout/Header"
import { AddList } from './components/boards/AddList';
import { List } from './components/boards/List';
import { useState } from 'react';

function App() {
  // State to manage the lists
  const [lists, setLists] = useState([]);

  // Function to add a new list
  const addList = (newListName) => {
    setLists([...lists, { name: newListName }]);
  };

  // Function to update the name of a list
  const updateListName = (index, newName) => {
    const updatedLists = [...lists];
    updatedLists[index].name = newName;
    setLists(updatedLists);
  };


const url = 'http://localhost:8000/register/';
const data = {
  email: 'jesusleon270@gmail.com',
  password: '12345678',
  password_confirm: '12345678',
  username: 'sdas'
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
    // Puedes añadir más encabezados si es necesario, como tokens de autenticación
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(data => {
    console.log('Respuesta del servidor:', data);
    // Puedes manejar la respuesta del servidor aquí
  })
  .catch(error => {
    console.error('Error al realizar la solicitud:', error);
    // Puedes manejar los errores aquí
  });





  return (
    // Main container with a background color and full height
    <div className=' h-screen'>
      {/* Header component */}
      <Header />
      
      {/* Container for lists and the "AddList" component */}
      <div className='flex m-5'>
        {/* Mapping through lists and rendering each "List" component */}
        {lists.map((list, index) => (
          <List key={index} listName={list.name} onUpdateListName={(newName) => updateListName(index, newName)} />
        ))}
        
        {/* "AddList" component to add new lists */}
        <AddList onAddList={addList} />
      </div>
    </div>
  );
}

// Exporting the App component as the default export
export default App;
